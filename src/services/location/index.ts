import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { AngularFire, FirebaseListObservable } from "angularfire2";

import { UserService } from "services/user";

import { Location, LocationQuery } from "models/location";

@Injectable()
export class LocationService {
  private locationRequestedSource = new Subject<LocationQuery>();
  locationRequested$ = this.locationRequestedSource.asObservable();

  private locationSetSource = new Subject<LocationQuery>();
  locationSet$ = this.locationSetSource.asObservable();

  private locationsObservable: FirebaseListObservable<any[]>;

  locations: {[key: string]: Location} = {};

  constructor(private af: AngularFire,
              private userService: UserService) {
    this.locationsObservable = af.database.list("/locations", {
      /* TODO: Use Geofire to get locations in users vicinity */
      query: {
        orderByChild: "lastUpdate",
        startAt: Date.now(),
        limitToLast: 10
      }
    });
  }

  requestLocation(params: {location?: Location,
                            name?: string,
                            coordinates?: google.maps.LatLngLiteral} = {}): void {
    let location: Location;
    let meta = {};

    if (params.location) {
      location = params.location;
    } else if (params.name) {
      location = new Location({name: params.name});
      meta = { auto: true };
    } else if (params.coordinates) {
      location = new Location({lat: params.coordinates.lat, lng: params.coordinates.lng});
    }

    if (location) {
      this.locationRequestedSource.next({location, meta});
      return;
    }

    this.getCurrentPosition().then( (position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      location = new Location({lat: lat, lng: lng});
      meta = { auto: true };
      this.locationRequestedSource.next({location, meta});
    });
  };

  getCurrentPosition(): Promise<any> {
    if (window.navigator.geolocation) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(function(position: any) {
          resolve(position);
        }, function(err: any) {
          throw new Error(err);
        });
      });
    } else {
      return new Promise((resolve) => {
        throw new Error("Not supported");
      });
    }
  }

  setLocation(query: LocationQuery): void {
    let meta = query.meta || {};
    let location: any = query.location;

    if (meta.auto) {
      location = location.getCity();
    }

    if (location.constructor.name === Location.name) {
      this.locationSetSource.next({location});
      this.userService.joinChannel(location.id);
    } else if (typeof location === "string") {
      this.requestLocation({name: location});
    }
  }

  createLocation(lat: number, lng: number): void {
    let locations = this.af.database.list("/locations");
    let key = locations.push({
      lat: lat,
      lng: lng,
      lastUpdate: Date.now()
    }).key;
    let newLocation = new Location({$key: key, lat, lng});
    this.requestLocation({location: newLocation});

  }

  getLocations(): Promise<Location[]> {
    return new Promise( (resolve) => {

      let lastMessageTime = new Date();
      lastMessageTime.setDate(lastMessageTime.getDate() - 1);

      let subscription = this.af.database.list("/locations", {
        query: {
          orderByChild: "lastUpdate",
          startAt: lastMessageTime.getTime()
        }
      }).subscribe( (snapshots: any[]) => {
        let locations: Location[] = [];
        snapshots.forEach( (data: {$key: string, lat: number, lng: number, lastUpdate: number}) => {
          let location = new Location({$key: data.$key, lat: data.lat, lng: data.lng, lastUpdate: data.lastUpdate});
          this.locations[data.$key] = location;
          locations.push(location);
        });
        resolve(locations);
        subscription.unsubscribe();
      });

    });
  }

  onLocationUpdate( callback: ($key: string, location: Location) => void ): void {
    this.locationsObservable.subscribe( (observables: any[]) => {
      observables.forEach( (data: {$key: string, lat: number, lng: number, lastUpdate: number}) => {
        let location = new Location({$key: data.$key, lat: data.lat, lng: data.lng, lastUpdate: data.lastUpdate});
        this.locations[data.$key] = location;
        callback(data.$key, location);
      });
    });
  }
}

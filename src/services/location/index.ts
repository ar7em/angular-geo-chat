import { Injectable } from "@angular/core";
import { Subject }    from "rxjs/Subject";
import { AngularFire, FirebaseListObservable } from "angularfire2";

import { Location } from "models/location";

@Injectable()
export class LocationService {
  private locationRequestedSource = new Subject<Location>();
  locationRequested$ = this.locationRequestedSource.asObservable();

  private locationSetSource = new Subject<Location>();
  locationSet$ = this.locationSetSource.asObservable();

  private locationsObservable: FirebaseListObservable<any[]>;

  locations: {[key: string]: Location} = {};

  constructor(private af: AngularFire) {
    this.locationsObservable = af.database.list("/locations", {
      /* TODO: Use Geofire to get locations in users vicinity */
      query: {
        orderByChild: "lastUpdate",
        startAt: Date.now(),
        limitToLast: 10
      }
    });
  }

  requestLocation(name?: string): void {
    if (!name) {
      this.getCurrentPosition().then( (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let location = new Location({lat: lat, lng: lng});
        this.locationRequestedSource.next(location);
      });

      return;
    }

    let location = new Location({name: name});
    this.locationRequestedSource.next(location);
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

  setLocation(location: Location): void {
    this.locationSetSource.next(location);
  }

  createLocation(lat: number, lng: number): void {
    let locations = this.af.database.list("/locations");
    locations.push({
      lat: lat,
      lng: lng,
      lastUpdate: Date.now()
    });
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
          let location = new Location({lat: data.lat, lng: data.lng, lastUpdate: data.lastUpdate});
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

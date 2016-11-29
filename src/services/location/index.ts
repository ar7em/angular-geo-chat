import { Injectable } from "@angular/core";
import { Subject }    from "rxjs/Subject";

import { Location } from "models/location";

@Injectable()
export class LocationService {
  private locationRequestedSource = new Subject<Location>();
  locationRequested$ = this.locationRequestedSource.asObservable();

  requestLocation(name?: string): void {
    if (!name) {
      this.getCurrentPosition().then( (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let location = new Location(undefined, lat, lng);
        this.locationRequestedSource.next(location);
      });

      return;
    }

    let location = new Location(name);
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
}

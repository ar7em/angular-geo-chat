import { Injectable } from "@angular/core";
import { Subject }    from "rxjs/Subject";

@Injectable()
export class LocationService {
  private locationRequestedSource = new Subject<string>();
  locationRequested$ = this.locationRequestedSource.asObservable();

  requestLocation(location: string): void {
    if (!location) {
      this.getCurrentPosition().then( (position) => {
        this.locationRequestedSource.next(position);
      });
    }
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

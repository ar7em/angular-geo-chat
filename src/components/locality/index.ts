import { Component, NgZone } from "@angular/core";
import { AngularFire } from "angularfire2";

import { LocationQuery } from "models/location";

import { LocationService } from "services/location";
import { UserService } from "services/user";

@Component({
  selector: "locality",
  template: require("./template.html")
})
export class LocalityComponent {
  location: string;

  constructor(private af: AngularFire,
              private locationService: LocationService,
              private zone: NgZone,
              private userService: UserService) {
    locationService.locationSet$.subscribe(
      (query: LocationQuery) => {
        this.zone.run( () => {
          this.location = query.location.address;
        });
      }
    );
  }

  onAutolocate() {
    this.locationService.requestLocation({name: this.location});
  }
}

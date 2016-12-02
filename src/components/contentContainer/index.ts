import { Component } from "@angular/core";
import { AngularFire } from "angularfire2";

import { Location } from "models/location";

import { LocationService } from "services/location";

import { facebookConfig } from "config/auth";

@Component({
  selector: "content",
  template: require("./template.html"),
  styles: [require("./style.scss")]
})
export class ContentContainer {
  location: string;

  constructor(public af: AngularFire, private locationService: LocationService) {
    this.locationService.requestLocation();

    locationService.locationSet$.subscribe(
      (location: Location) => {
        this.location = location.getCity().formatted_address;
      }
    );
  }

  onAutolocate() {
    this.locationService.requestLocation(this.location);
  }

  login() {
    this.af.auth.login(facebookConfig);
  }
}

import { Component } from "@angular/core";
import { AngularFire } from "angularfire2";

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
    this.af.auth.subscribe(auth => console.log(auth));
  }

  onAutolocate() {
    this.locationService.requestLocation(this.location);
  }

  login() {
    this.af.auth.login(facebookConfig);
  }
}

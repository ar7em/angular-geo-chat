import { Component } from "@angular/core";
import { AngularFire } from "angularfire2";

import { LocationService } from "services/location";

@Component({
  selector: "content",
  template: require("./template.html"),
  styles: [require("./style.scss")]
})
export class ContentContainer {
  location: string;

  constructor(af: AngularFire, private locationService: LocationService) {
  }

  onAutolocate(): void {
    this.locationService.requestLocation();
  }
}

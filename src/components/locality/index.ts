import { Component } from "@angular/core";
import { AngularFire } from "angularfire2";

import { Location } from "models/location";

import { LocationService } from "services/location";

@Component({
  selector: "locality",
  template: require("./template.html")
})
export class LocalityComponent {
  location: string;

  constructor(public af: AngularFire, private locationService: LocationService) {
    locationService.locationSet$.subscribe(
      (location: Location) => {
        this.location = location.getCity().formatted_address;
      }
    );
  }

  onAutolocate() {
    this.locationService.requestLocation(this.location);
  }
}

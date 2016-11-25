import { Component } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";

import { LocationService } from "services/location";
import { MapService } from "services/map";

@Component({
  selector: "root-app",
  template: require("./template.html"),
  styles: [require("./style.scss")],
  providers: [ MapService, LocationService ]
})
export class AppComponent {
  location: "";

  items: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
  }
}

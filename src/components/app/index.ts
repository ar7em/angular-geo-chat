import { Component } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";

import { GeoMap } from "models/map";

@Component({
  selector: "root-app",
  template: require("./template.html"),
  styles: [require("./style.scss")]
})
export class AppComponent {
  map: GeoMap;
  items: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
  }
}

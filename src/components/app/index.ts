import { Component } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";

import { LocationService } from "services/location";
import { MapService } from "services/map";
import { UserService } from "services/user";

@Component({
  selector: "root-app",
  template: require("./template.html"),
  styles: [require("./style.scss")],
  providers: [ MapService, LocationService, UserService ]
})
export class AppComponent {
  location: "";

  items: FirebaseListObservable<any[]>;

  constructor(af: AngularFire, user: UserService) {
  }
}

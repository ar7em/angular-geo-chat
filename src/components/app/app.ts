import { Component } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";

@Component({
  selector: "root-app",
  template: require("./app.html"),
  styles: [require("./app.scss")]
})

export class AppComponent {
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list("items");
  }
}

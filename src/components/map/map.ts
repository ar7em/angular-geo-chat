import { Component } from "@angular/core";

@Component({
  selector: "map",
  template: require("./map.html"),
  styles: [require("./map.scss")]
})

export class MapComponent {
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list("items");
  }
}

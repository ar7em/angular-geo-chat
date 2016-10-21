import { Component } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { apiKey } from "config/maps";

const apiUrl = "https://maps.googleapis.com/maps/api/js?key=${apiKey}";

@Component({
  selector: "map",
  template: require("./map.html"),
  styles: [require("./map.scss")]
})

export class MapComponent {
  private static loadAPI: Promise<any>;
  private static load() {
    let node = document.createElement("script");
    node.src = apiUrl;
    node.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(node);
    node.onload = function() {
      let state = node.readyState;
      console.log(state);
    };
  };
  constructor(af: AngularFire) {
    this.loadAPI = new Promise((resolve) => {
      this.load();
    });
  }
}

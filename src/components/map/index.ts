import { Component } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { apiKey } from "config/maps";

const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

@Component({
  selector: "map",
  template: require("./template.html"),
  styles: [require("./style.scss")]
})
export class MapComponent {
  static API: any;
  static count: number = 1;

  private mapId: string;
  private map: Promise<google.maps.Map>;

  constructor(af: AngularFire) {
    this.mapId = "googleMaps" + MapComponent.count++;

    this.map = this.load().then((API) => {
      MapComponent.API = API;
      return new API.Map(document.getElementById(this.mapId), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
        disableDefaultUI: true
      });
    });
  }

  public setCenter(): void {
    this.map.then( (map) => {
      map.setCenter(new MapComponent.API.LatLng(59.436962, 24.753574));
    });
  }

  private load(): Promise<any> {
    if (MapComponent.API) {
      return MapComponent.API;
    }

    let node = <HTMLScriptElement>document.createElement("script");
    node.src = apiUrl;
    node.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(node);
    return new Promise((resolve) => {
      node.onload = function() {
        resolve((window as any)["google"]["maps"]);
      };
    });
  };
}

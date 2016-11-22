import { Component, OnInit } from "@angular/core";

import { MapService } from "services/map";
import { GeoMap } from "models/map";

const mapElementId = "googleMap";

@Component({
  selector: "map",
  template: require("./template.html").replace("`${mapElementId}`", mapElementId),
  styles: [require("./style.scss")],
  providers: [MapService]
})
export class MapComponent {
  map: GeoMap;

  constructor(private mapService: MapService) {
  }

  createMap(): void {
    let element = document.getElementById(mapElementId);
    this.mapService.createMap(element).then((map: GeoMap) => {
      this.map = map;
    });
  }

  ngOnInit(): void {
    this.createMap();
  }
}

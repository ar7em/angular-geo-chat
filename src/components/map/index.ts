import { Component, OnInit } from "@angular/core";
import { Subscription }   from "rxjs/Subscription";

import { MapService } from "services/map";
import { LocationService } from "services/location";

import { GeoMap } from "models/map";

const mapElementId = "googleMap";

@Component({
  selector: "map",
  template: require("./template.html").replace("`${mapElementId}`", mapElementId),
  styles: [require("./style.scss")]
})
export class MapComponent implements OnInit {
  map: GeoMap;
  location: string;
  subscription: Subscription;

  constructor(private mapService: MapService, private locationService: LocationService) {
    this.subscription = locationService.locationRequested$.subscribe(
      (location: string) => {
        this.location = location;
        console.log("New location:", location);
      }
    );
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

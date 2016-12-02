import { Component, OnInit } from "@angular/core";
import { Subscription }   from "rxjs/Subscription";

import { MapService } from "services/map";
import { LocationService } from "services/location";

import { GeoMap } from "models/map";
import { Location } from "models/location";

const mapElementId = "googleMap";

@Component({
  selector: "map",
  template: require("./template.html").replace("`${mapElementId}`", mapElementId),
  styles: [require("./style.scss")]
})
export class MapComponent implements OnInit {
  map: GeoMap;
  requestedLocation: Location;
  subscription: Subscription;

  constructor(private mapService: MapService, private locationService: LocationService) {
    this.subscription = locationService.locationRequested$.subscribe(
      (requestedLocation: Location) => {
        this.requestedLocation = requestedLocation;
        this.map.geocode(requestedLocation).then( (location: Location) => {
          locationService.setLocation(location);
        });
      }
    );

    this.subscription = locationService.locationSet$.subscribe(
      (location: Location) => {
        this.positionMap(location);
      }
    );
  };

  createMap(): void {
    let element = document.getElementById(mapElementId);
    this.mapService.createMap(element).then((map: GeoMap) => {
      this.map = map;
    });
  }

  positionMap(location: Location): void {
    if (!this.map) {
      return;
    }

    let city = location.getCity();

    if (city) {
      this.map.fitBounds(city.geometry.bounds);
    }
  }

  ngOnInit(): void {
    this.createMap();
  }
}

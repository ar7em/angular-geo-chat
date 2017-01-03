import { Component, OnInit } from "@angular/core";
import { Subscription }   from "rxjs/Subscription";

import { MapService } from "services/map";
import { LocationService } from "services/location";

import { GeoMap } from "models/map";
import { Location, LocationQuery } from "models/location";

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

  constructor(private mapService: MapService,
              private locationService: LocationService) {
    this.subscription = locationService.locationRequested$.subscribe(
      (query: LocationQuery) => {
        this.requestedLocation = query.location;
        if (!this.map) {
          return;
        }
        this.map.geocode(this.requestedLocation).then( (location: Location) => {
          locationService.setLocation({location: location, meta: query.meta});
        });
      }
    );

    this.subscription = locationService.locationSet$.subscribe(
      (query: LocationQuery) => {
        this.positionMap(query.location);
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

    if (location.coordinates) {
      let isInBounds = this.map.getBounds().contains(location.coordinates);
      if (isInBounds) {
        return;
      } else {
        this.map.setCenter(location.coordinates);
      }
    }

    if (location.bounds) {
      this.map.fitBounds(location.bounds);
    }
  }

  ngOnInit(): void {
    this.createMap();
    this.locationService.getLocations().then( (locations: Location[]) => {
      locations.forEach( (location: Location) => {
        this.addMarker(location);
      });
    });

    this.locationService.onLocationUpdate( ($key, location) => {
      this.addMarker(location);
    });
  }

  addMarker(location: Location): google.maps.Marker {
    let marker = this.map.addMarker(location);
    marker.addListener("click", () => {
      this.locationService.requestLocation({location: location});
    });
    return marker;
  }
}

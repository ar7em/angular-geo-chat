import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { GeoMap } from "models/map";
import { apiKey } from "config/maps";

const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

@Injectable()
export class MapService {
  static API: any;
  private clickEvent = new Subject<google.maps.event>();
  private rightClickEvent = new Subject<google.maps.event>();
  click$ = this.clickEvent.asObservable();
  rightClick$ = this.rightClickEvent.asObservable();

  public createMap(element: HTMLElement): Promise<GeoMap> {
    return this.load().then((API) => {
      let map = new GeoMap(API, element);
      map.addListener("click", (event: google.maps.event) => {
        this.clickEvent.next(event);
      });
      map.addListener("rightclick", (event: google.maps.event) => {
        this.rightClickEvent.next(event);
      });
      return map;
    });
  }

  private load(): Promise<any> {
    if (MapService.API) {
      return MapService.API;
    }

    let node = <HTMLScriptElement>document.createElement("script");
    node.src = apiUrl;
    node.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(node);

    return new Promise((resolve) => {
      node.onload = function() {
        MapService.API = (window as any)["google"]["maps"];
        resolve(MapService.API);
      };
    });
  };
}

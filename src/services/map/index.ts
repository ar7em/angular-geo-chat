import { Injectable } from "@angular/core";

import { GeoMap } from "models/map";
import { apiKey } from "config/maps";

const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

@Injectable()
export class MapService {
  static API: any;

  public createMap(element: HTMLElement): Promise<GeoMap> {
    return this.load().then((API) => {
      return new GeoMap(API, element);
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

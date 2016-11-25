import { Location } from "models/location";

export class GeoMap {
  private API: any;
  private map: google.maps.Map;

  constructor(API: any, element: HTMLElement) {
    this.API = API;
    this.map = new API.Map(element, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8,
      disableDefaultUI: true
    });
  }

  public setCenter(coordinates: google.maps.LatLngLiteral): void {
    this.map.setCenter(coordinates);
  }

  public geocode(location: Location): Promise<any> {
    return new Promise( (resolve) => {
      let geocoder = new this.API.Geocoder;
      geocoder.geocode({location: location.coordinates}, function(results: any, status: any) {
        console.log(results, status);
        resolve(new Location());
      });
    });
  }
}

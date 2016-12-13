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
    let query: any;

    if (location.name) {
      query = {address: location.name};
    } else if (location.id) {
      query = {placeId: location.id};
    } else {
      query = {location: location.coordinates};
    }

    return new Promise( (resolve) => {
      let geocoder = new this.API.Geocoder;
      geocoder.geocode(query, function(results: google.maps.GeocoderResult[], status: any) {
        if (status !== google.maps.GeocoderStatus.OK) {
          throw Error(status);
        }
        let precisePosition = new Location(location.name, location.coordinates.lat, location.coordinates.lng, results);
        resolve(precisePosition);
      });
    });
  }

  public fitBounds(bounds: google.maps.LatLngBounds): void {
    this.map.fitBounds(bounds);

    // Move the map to the left to prevent overlap with content div
    window.setTimeout(() => {
      let contentDiv = document.getElementById("mainContainer");
      let correctionX = contentDiv.clientWidth / 2;
      this.map.panBy(correctionX, 0);
    }, 0);
  }
}

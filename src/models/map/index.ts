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

  public setCenter(): void {
    this.map.setCenter(new this.API.LatLng(59.436962, 24.753574));
  }
}

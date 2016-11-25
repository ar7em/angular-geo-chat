export class Location {
  name: string;
  private lat: number;
  private lng: number;

  constructor(name?: string, lat?: number, lng?: number) {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
  }

  public get coordinates(): google.maps.LatLngLiteral {
    return {
      lat: this.lat,
      lng: this.lng
    };
  }
};

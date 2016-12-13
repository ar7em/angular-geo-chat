export class Location {
  name: string;
  private lat: number;
  private lng: number;
  private addresses: google.maps.GeocoderResult[];

  constructor(name?: string, lat?: number, lng?: number, addresses?: google.maps.GeocoderResult[]) {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
    this.addresses = addresses;
  }

  public get coordinates(): {lat?: number, lng?: number} {
    return {
      lat: this.lat,
      lng: this.lng
    };
  }

  public get id(): string {
    let place = this.getCity();
    return place ? place.place_id : "";
  }

  public getCity(): google.maps.GeocoderResult {
    console.log(this.addresses);
    if (!this.addresses || !this.addresses.length) {
      return;
    }

    let cities = this.addresses.filter(function(address: google.maps.GeocoderResult) {
      if (address.types.indexOf("locality") > -1 && address.types.indexOf("political") > -1) {
        return true;
      }
    });

    if (cities.length) {
      return cities[0];
    } else {
      return this.addresses[0];
    }
  };
};

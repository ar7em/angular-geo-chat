export class Location {
  name: string;
  private lat: number;
  private lng: number;
  private addresses: google.maps.GeocoderResult[];
  private ownerId: string;
  private lastUpdate: number;
  private $key: string;

  constructor(params: { name?: string,
                        lat?: number,
                        lng?: number,
                        addresses?: google.maps.GeocoderResult[],
                        ownerId?: string,
                        lastUpdate?: number
                        $key?: string}) {
    this.name = params.name;
    this.lat = params.lat;
    this.lng = params.lng;
    this.addresses = params.addresses;
    this.ownerId = params.ownerId;
    this.lastUpdate = params.lastUpdate;
    this.$key = params.$key;
  }

  public get coordinates(): {lat?: number, lng?: number} {
    return {
      lat: this.lat,
      lng: this.lng
    };
  }

  public get id(): string {
    if (this.$key) {
      return this.$key;
    }
    let place = this.getCity();
    return place ? place.place_id : "";
  }

  public getCity(): google.maps.GeocoderResult {
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

  public get data(): {name?: string,
                      lat?: number,
                      lng?: number,
                      ownerId?: string } {
    return {
      name: this.name,
      lat: this.lat,
      lng: this.lng,
      ownerId: this.ownerId
    };
  }
};

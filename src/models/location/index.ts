function isCity(address: google.maps.GeocoderResult | google.maps.GeocoderAddressComponent): boolean {
  return address.types && address.types.indexOf("locality") > -1 && address.types.indexOf("political") > -1;
}

function isAdministrativeObject(address: google.maps.GeocoderResult | google.maps.GeocoderAddressComponent): boolean {
  return address.types && address.types.indexOf("political") > -1;
}

export class Location {
  name: string;
  private lat: number;
  private lng: number;
  private addresses: google.maps.GeocoderResult[];
  private ownerId: string;
  private lastUpdate: number;
  private $key: string;
  private placeId: string;
  bounds: google.maps.LatLngBounds;

  constructor(params: { name?: string,
                        lat?: number,
                        lng?: number,
                        addresses?: google.maps.GeocoderResult[],
                        ownerId?: string,
                        lastUpdate?: number,
                        $key?: string,
                        placeId?: string,
                        bounds?: google.maps.LatLngBounds}) {
    this.name = params.name;
    this.lat = params.lat;
    this.lng = params.lng;
    this.addresses = params.addresses;
    this.ownerId = params.ownerId;
    this.lastUpdate = params.lastUpdate;
    this.$key = params.$key;
    this.placeId = params.placeId;
    this.bounds = params.bounds;
  }

  public get coordinates(): {lat: number, lng: number} {
    if (!(this.lat && this.lng)) {
      if (this.addresses && this.addresses.length) {
        let coordinates = this.addresses[0].geometry.location;
        return {
          lat: coordinates.lat(),
          lng: coordinates.lng()
        };
      }
      return;
    }

    return {
      lat: this.lat,
      lng: this.lng
    };
  }

  public get id(): string {
    return this.$key ||
            this.placeId ||
            (this.addresses && this.addresses.length ? this.addresses[0].place_id : "") ||
            "";
  }

  public getCity(): string | Location {
    if (!this.addresses || !this.addresses.length) {
      return;
    }

    let cities: google.maps.GeocoderResult[];

    cities = this.addresses.filter(function(address: google.maps.GeocoderResult) {
      return isCity(address);
    });

    if (!cities.length) {
      cities = this.addresses.filter(function(address: google.maps.GeocoderResult) {
        return isAdministrativeObject(address);
      });
    }

    if (cities.length) {
      // If the information about location's city is available,
      // return it as a new location with filled data
      let city = cities[0];
      return new Location({
        placeId: city.place_id,
        name: city.formatted_address,
        lat: this.lat,
        lng: this.lng,
        bounds: city.geometry.bounds
      });
    } else if (this.addresses[0].address_components && this.addresses[0].address_components.length) {
      // If only the city name is available, return it as a string
      let addressComponents = this.addresses[0].address_components;
      let cityNames = addressComponents.filter( (address: google.maps.GeocoderAddressComponent) => {
        return isCity(address);
      });
      return cityNames && cityNames.length && cityNames[0].long_name;
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

  public get address(): string {
    if (this.addresses && this.addresses[0]) {
      return this.addresses[0].formatted_address;
    } else if (this.name) {
      return this.name;
    }

    return this.placeId;
  }

  public assignAddresses(addresses: google.maps.GeocoderResult[]): void {
    this.addresses = addresses;
  }
};

export interface LocationQuery {
  location: Location;
  meta?: {
    auto?: boolean
  };
};

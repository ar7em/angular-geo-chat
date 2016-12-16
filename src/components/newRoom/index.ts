import { Component, ElementRef, ChangeDetectorRef, OnInit } from "@angular/core";

import { MapService } from "services/map";
import { LocationService } from "services/location";

@Component({
  selector: "newRoom",
  template: require("./template.html"),
  styles: [require("./style.scss")]
})
export class NewRoomComponent implements OnInit {
  x: number;
  y: number;
  lat: number;
  lng: number;
  visible: boolean;

  constructor(private ref: ChangeDetectorRef,
              private el: ElementRef,
              private mapService: MapService,
              private locationService: LocationService) {
    this.x = 0;
    this.y = 0;

    this.visible = false;
  }

  ngOnInit() {
    this.mapService.click$.subscribe(
      (event: any) => {
        this.hide();
        this.ref.detectChanges();
      }
    );

    this.mapService.rightClick$.subscribe(
      (event: any) => {
        if (!event.pixel || !event.latLng) {
          return;
        }

        this.lat = event.latLng.lat();
        this.lng = event.latLng.lng();

        this.moveTo(event.pixel.x, event.pixel.y);

        /*
          TODO: if the `detectChanges` method is not called, there is a lag before
                the component renders changes. Investigate why.
        */
        this.ref.detectChanges();
      }
    );
  }

  moveTo(x: number, y: number) {
    let el = this.el.nativeElement.firstElementChild;
    let width = el.offsetWidth;
    let height = el.offsetHeight;
    this.x = x - (width / 2);
    this.y = y - (height - 15);
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  createChat() {
    this.locationService.createLocation(this.lat, this.lng);
    this.hide();
  }
}

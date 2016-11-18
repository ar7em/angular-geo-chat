import { Component } from "@angular/core";
import { AngularFire } from "angularfire2";

@Component({
  selector: "content",
  template: require("./template.html"),
  styles: [require("./style.scss")]
})
export class ContentContainer {
  constructor(af: AngularFire) {
  }
}

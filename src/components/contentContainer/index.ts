import { Component } from "@angular/core";

@Component({
  selector: "content",
  template: require("./template.html"),
  styles: [require("./style.scss")]
})
export class ContentContainer {
  constructor() {}
}

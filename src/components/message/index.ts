import "rxjs/add/operator/take";

import { Component, Input } from "@angular/core";
import { AngularFire } from "angularfire2";

import { Message } from "models/message";
import { Person } from "models/person";

@Component({
  selector: "message",
  template: require("./template.html"),
  styles: [require("./style.scss")]
})
export class MessageComponent {
  @Input()
  author: Person;

  @Input()
  message: Message;

  @Input()
  isFirst: Boolean;

  constructor(private af: AngularFire) {
  }

  getTime(): string {
    if (this.message) {
      return new Date(this.message.timestamp).toLocaleTimeString();
    }
    return "";
  }
};

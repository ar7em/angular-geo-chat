import "rxjs/add/operator/take";

import { Component, Input } from "@angular/core";
import { AngularFire } from "angularfire2";

import { Message } from "models/message";
import { Person } from "models/person";

@Component({
  selector: "message",
  template: require("./template.html")
})
export class MessageComponent {
  @Input()
  author: Person;

  @Input()
  message: Message;

  constructor(private af: AngularFire) {}
};

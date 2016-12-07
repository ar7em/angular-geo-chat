import { Component } from "@angular/core";
import { AngularFire } from "angularfire2";

import { Message } from "models/message";

@Component({
  selector: "chat",
  template: require("./template.html")
})
export class ChatComponent {
  messages: Message[];

  constructor(public af: AngularFire) {
    const messagesObservable = af.database.list("/messages", {
      query: {
        limitToLast: 10,
      }
    });

    messagesObservable.subscribe( (messages: any) => {
      this.messages = messages.map( (data: {text: string, authorId: string}) => {
        return new Message(data.text, data.authorId);
      });
    });
  }
};

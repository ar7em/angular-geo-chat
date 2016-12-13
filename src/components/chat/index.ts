import {Subject} from "rxjs/Subject";

import { Component } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";

import { Message } from "models/message";
import { Person } from "models/person";
import { Location } from "models/location";

import { LocationService } from "services/location";

@Component({
  selector: "chat",
  template: require("./template.html")
})
export class ChatComponent {
  private isRendered: {[key: string]: boolean};
  private messagesObservable: FirebaseListObservable<any>;
  private locationId = new Subject<string>();
  messages: Message[];
  authors: {[key: string]: Person};

  constructor(public af: AngularFire, private locationService: LocationService) {
    this.messages = [];
    this.authors = {};
    this.isRendered = {};

    this.messagesObservable = af.database.list("/messages", {
      query: {
        limitToLast: 10,
        orderByChild: "target",
        equalTo: this.locationId
      }
    });

    this.messagesObservable.subscribe( (observables: any[]) => {
      observables.forEach( (data: {$key: string, text?: string, authorId?: string}) => {
        // Create Message object
        if (!this.isRendered[data.$key]) {
          let message = new Message(data.text, data.authorId);
          this.messages.push(message);
          this.isRendered[data.$key] = true;
        }
        // Retrieve data about author and create Person object
        if (data.authorId && !this.authors[data.authorId]) {
          let authorObservable = af.database.object(`/users/${data.authorId}`);
          authorObservable.subscribe( (authorData) => {
            let author = new Person(authorData);
            this.authors[data.authorId] = author;
          });
        }
      });
    });

    locationService.locationSet$.subscribe(
      (location: Location) => {
        this.isRendered = {};
        this.messages = [];
        this.locationId.next(location.id);
      }
    );
  }
};

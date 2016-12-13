import { Injectable } from "@angular/core";
import { AngularFire } from "angularfire2";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase";

import { Person } from "models/person";
import { Message } from "models/message";

import { facebookConfig } from "config/auth";

@Injectable()
export class UserService {
  person: Observable<Person>;
  private uid: string;

  constructor(private af: AngularFire) {
    this.af.auth.subscribe( (auth) => {
      if (!auth) {
        return;
      }
      console.log(auth);
      this.uid = auth.uid;
      // Mark user as disconnect when connection drops
      const onlineRef = firebase.database().ref().child(`/users/${auth.uid}`);
      onlineRef.onDisconnect().update({"online": false});
      // Mark user as online for now
      const userObservable = af.database.object(`/users/${auth.uid}`);
      userObservable.set({
        "online": true,
        "displayName": auth.auth.displayName,
        "photoUrl": auth.auth.photoURL
      });
    });
  }

  login() {
    this.af.auth.login(facebookConfig);
  }

  logout() {
    this.af.auth.logout();
  }

  submitMessage(text: string, target: string) {
    let message = new Message(text, this.uid, target);
    let messages = this.af.database.list(`/messages`);
    messages.push(message.data);
  }
}

import { Injectable } from "@angular/core";
import { AngularFire, FirebaseObjectObservable } from "angularfire2";
import { Subject } from "rxjs/Subject";
import * as firebase from "firebase";

import { Message } from "models/message";

import { facebookConfig } from "config/auth";

@Injectable()
export class UserService {
  private user: FirebaseObjectObservable<any>;

  private uid: string;
  private currentChannelId: string;

  private channelRequestedSource = new Subject<string>();
  channelSet$ = this.channelRequestedSource.asObservable();

  constructor(private af: AngularFire) {
    this.af.auth.subscribe( (auth) => {
      if (!auth) {
        return;
      }

      this.uid = auth.uid;
      // Mark user as disconnect when connection drops
      // (notice, the `onDisconnect` handler is not available with AF2)
      const onlineRef = firebase.database().ref().child(`/users/${auth.uid}`);
      onlineRef.onDisconnect().update({"online": false});

      // Mark user as online for now
      this.user = af.database.object(`/users/${auth.uid}`);
      this.user.set({
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

  submitMessage(text: string) {
    let datestamp = firebase.database.ServerValue.TIMESTAMP;
    let message = new Message(text, this.uid, this.currentChannelId, datestamp);
    let messages = this.af.database.list(`/messages`);
    messages.push(message.data);
  }

  joinChannel(id: string) {
    if (this.user) {
      this.user.update({
        "channel": id
      });
    }
    this.channelRequestedSource.next(id);
    this.currentChannelId = id;
  }
}

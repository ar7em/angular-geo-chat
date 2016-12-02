import { Injectable } from "@angular/core";
import { AngularFire } from "angularfire2";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase";

import { Person } from "models/person";

@Injectable()
export class UserService {
  person: Observable<Person>;

  constructor(private af: AngularFire) {
    this.af.auth.subscribe( (auth) => {
      // Mark user as disconnect when connection drops
      const onlineRef = firebase.database().ref().child(`/users/${auth.uid}`);
      onlineRef.onDisconnect().update({"online": false});
      // Mark user as online for now
      const userObservable = af.database.object(`/users/${auth.uid}`);
      userObservable.set({"online": true});
    });
  }
}

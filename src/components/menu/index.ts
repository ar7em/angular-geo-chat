import { Component } from "@angular/core";
import { AngularFire } from "angularfire2";

import { UserService } from "services/user";

@Component({
  selector: "menuContainer",
  template: require("./template.html")
})
export class MenuComponent {
  constructor(private af: AngularFire, private userService: UserService) {
  }

  login() {
    this.userService.login();
  }
}

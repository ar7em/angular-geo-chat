import { Component } from "@angular/core";

import { UserService } from "services/user";
import { LocationService } from "services/location";

@Component({
  selector: "userInput",
  template: require("./template.html")
})
export class UserInputComponent {
  input: string;
  target: string;

  constructor(private userService: UserService, private locationService: LocationService) {
    locationService.locationSet$.subscribe(
      (location) => {
        this.target = location.id;
      }
    );
  }

  login() {
    this.userService.login();
  }

  submit() {
    this.userService.submitMessage(this.input, this.target);
  }
}

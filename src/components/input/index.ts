import { Component } from "@angular/core";

import { UserService } from "services/user";

@Component({
  selector: "userInput",
  template: require("./template.html")
})
export class UserInputComponent {
  input: string;

  constructor(private userService: UserService) {}

  login() {
    this.userService.login();
  }

  submit() {
    this.userService.submitMessage(this.input);
  }
}

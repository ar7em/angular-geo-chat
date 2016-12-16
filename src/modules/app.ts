import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { AngularFireModule } from "angularfire2";

import { AppComponent } from "components/app";
import { MapComponent } from "components/map";
import { ContentContainer } from "components/contentContainer";
import { ChatComponent } from "components/chat";
import { MenuComponent } from "components/menu";
import { LocalityComponent } from "components/locality";
import { UserInputComponent } from "components/input";
import { MessageComponent } from "components/message";
import { NewRoomComponent } from "components/newRoom";

import { firebaseConfig } from "config/firebase";
import { facebookConfig } from "config/auth";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig, facebookConfig),
    MaterialModule.forRoot(),
    FormsModule
  ],
  declarations: [
    AppComponent,
    MapComponent,
    ContentContainer,
    ChatComponent,
    MenuComponent,
    LocalityComponent,
    UserInputComponent,
    MessageComponent,
    NewRoomComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
};

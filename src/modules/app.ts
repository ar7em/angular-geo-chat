import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { AngularFireModule } from "angularfire2";

import { AppComponent } from "components/app";
import { MapComponent } from "components/map";
import { ContentContainer } from "components/contentContainer";
import { firebaseConfig } from "config/firebase";
import { facebookConfig } from "config/auth";

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, facebookConfig),
    MaterialModule.forRoot(),
    FormsModule
  ],
  declarations: [
    AppComponent,
    MapComponent,
    ContentContainer
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
};

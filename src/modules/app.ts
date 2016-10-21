import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "components/app/app";
import { MapComponent } from "components/map/map";
import { AngularFireModule } from "angularfire2";
import { firebaseConfig } from "config/firebase";

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [ AppComponent, MapComponent ],
  bootstrap: [ AppComponent, MapComponent ]
})

export class AppModule {};

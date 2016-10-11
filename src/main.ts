import "reflect-metadata";
require("zone.js/dist/zone");

require("templates/index.html");

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "modules/app";

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

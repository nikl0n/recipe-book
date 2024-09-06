import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

export type Environment = {
  production: boolean;
  api: {
    baseUrl: string;
  };
};

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState, provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { routes } from "./app.routes";
import { CourseEffect } from "./states/course/course.effect";
import { courseFeature } from "./states/course/course.reducer";
import { RecipeEffect } from "./states/recipe/recipe.effect";
import { recipeFeature } from "./states/recipe/recipe.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideAnimationsAsync(),

    provideStore(),
    provideEffects(RecipeEffect),
    provideEffects(CourseEffect),
    provideState(recipeFeature),
    provideState(courseFeature),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};

import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";

import { provideEffects } from "@ngrx/effects";
import { provideState, provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { provideHttpClient, withFetch } from "@angular/common/http";
import { environment } from "../environment/environment";
import { routes } from "./app.routes";
import { CategoryEffect } from "./states/category/category.effect";
import { categoryFeature } from "./states/category/category.reducer";
import { IngredientEffect } from "./states/ingredient/ingredient.effect";
import { ingredientFeature } from "./states/ingredient/ingredient.reducer";
import { RecipeEffect } from "./states/recipe/recipe.effect";
import { recipeFeature } from "./states/recipe/recipe.reducer";
import { StepEffect } from "./states/step/step.effect";
import { stepFeature } from "./states/step/step.reducer";
import { UnitEffect } from "./states/unit/unit.effect";
import { unitFeature } from "./states/unit/unit.reducer";
import { UserEffect } from "./states/user/user.effect";
import { userFeature } from "./states/user/user.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(withFetch()),

    provideAnimationsAsync(),

    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),

    provideEffects(RecipeEffect),
    provideState(recipeFeature),

    provideEffects(CategoryEffect),
    provideState(categoryFeature),

    provideEffects(IngredientEffect),
    provideState(ingredientFeature),

    provideEffects(StepEffect),
    provideState(stepFeature),

    provideEffects(UnitEffect),
    provideState(unitFeature),

    provideEffects(UserEffect),
    provideState(userFeature),
  ],
};

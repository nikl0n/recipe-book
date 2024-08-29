import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";

import { provideEffects } from "@ngrx/effects";
import { provideState, provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { provideHttpClient, withFetch } from "@angular/common/http";
import { routes } from "./app.routes";
import { CategoryEffect } from "./states/category/category.effect";
import { categoryFeature } from "./states/category/category.reducer";
import { ImageEffect } from "./states/image/image.effect";
import { imageFeature } from "./states/image/image.reducer";
import { IngredientEffect } from "./states/ingredient/ingredient.effect";
import { ingredientFeature } from "./states/ingredient/ingredient.reducer";
import { RecipeEffect } from "./states/recipe/recipe.effect";
import { recipeFeature } from "./states/recipe/recipe.reducer";
import { StepEffect } from "./states/step/step.effect";
import { stepFeature } from "./states/step/step.reducer";
import { UnitEffect } from "./states/unit/unit.effect";
import { unitFeature } from "./states/unit/unit.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(withFetch()),

    provideAnimationsAsync(),

    provideStore(),

    provideEffects(RecipeEffect),
    provideState(recipeFeature),

    provideEffects(CategoryEffect),
    provideState(categoryFeature),

    provideEffects(ImageEffect),
    provideState(imageFeature),

    provideEffects(IngredientEffect),
    provideState(ingredientFeature),

    provideEffects(StepEffect),
    provideState(stepFeature),

    provideEffects(UnitEffect),
    provideState(unitFeature),

    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};

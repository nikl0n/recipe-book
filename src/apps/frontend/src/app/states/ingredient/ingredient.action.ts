import { HttpErrorResponse } from "@angular/common/http";

import { ReadIngredient } from "@packages/types";

import { createActionGroup, props } from "@ngrx/store";

export const IngredientActions = createActionGroup({
  source: "Ingredient",
  events: {
    setLastFetched: props<{ componentName: string }>(),

    fetchByRecipeId: props<{ recipeId: number }>(),
    fetchByRecipeIdSuccess: props<{ ingredients: ReadIngredient[] }>(),
    fetchByRecipeIdFailure: props<{ error: HttpErrorResponse }>(),
  },
});

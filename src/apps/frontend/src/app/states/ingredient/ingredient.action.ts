import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, props } from "@ngrx/store";

import { Ingredient } from "../../api/ingredients.api";

export const IngredientActions = createActionGroup({
  source: "Ingredient",
  events: {
    setLastFetched: props<{ componentName: string }>(),

    fetchByRecipeId: props<{ recipeId: number }>(),
    fetchByRecipeIdSuccess: props<{ ingredients: Ingredient[] }>(),
    fetchByRecipeIdFailure: props<{ error: HttpErrorResponse }>(),
  },
});

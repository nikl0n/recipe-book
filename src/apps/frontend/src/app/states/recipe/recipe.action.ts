import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { Recipe } from "../../api/recipe.api";

export const RecipeActions = createActionGroup({
  source: "Recipe",
  events: {
    fetchAll: emptyProps(),
    fetchAllSuccess: props<{ recipes: Recipe[] }>(),
    fetchAllFailure: props<{ error: HttpErrorResponse }>(),

    fetchById: props<{ recipeId: number }>(),
    fetchByIdSuccess: props<{ recipe: Recipe }>(),
    fetchByIdFailure: props<{ error: HttpErrorResponse }>(),
  },
});

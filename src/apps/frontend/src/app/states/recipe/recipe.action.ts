import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { CreateRecipe, Recipe } from "../../api/recipe.api";

export const RecipeActions = createActionGroup({
  source: "Recipe",
  events: {
    setLastFetched: props<{ componentName: string }>(),

    fetchAll: emptyProps(),
    fetchAllSuccess: props<{ recipes: Recipe[] }>(),
    fetchAllFailure: props<{ error: HttpErrorResponse }>(),

    fetchById: props<{ recipeId: number }>(),
    fetchByIdSuccess: props<{ recipe: Recipe }>(),
    fetchByIdFailure: props<{ error: HttpErrorResponse }>(),

    create: props<{ recipe: CreateRecipe }>(),
    createSuccess: props<{ recipe: Recipe }>(),
    createFailure: props<{ error: HttpErrorResponse }>(),

    delete: props<{ recipeId: number }>(),
    deleteSuccess: props<{ recipe: Recipe }>(),
    deleteFailure: props<{ error: HttpErrorResponse }>(),
  },
});

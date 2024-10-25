import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { ReadRecipe } from "@packages/types";

import { CreateRecipeExtended, UpdateRecipeExtended } from "../../api/recipe.api";

export const RecipeActions = createActionGroup({
  source: "Recipe",
  events: {
    setLastFetched: props<{ componentName: string }>(),

    fetchAll: emptyProps(),
    fetchAllSuccess: props<{ recipes: ReadRecipe[] }>(),
    fetchAllFailure: props<{ error: HttpErrorResponse }>(),

    fetchById: props<{ recipeId: number }>(),
    fetchByIdSuccess: props<{ recipe: ReadRecipe }>(),
    fetchByIdFailure: props<{ error: HttpErrorResponse }>(),

    create: props<{ recipe: CreateRecipeExtended; token: string }>(),
    createSuccess: props<{ recipe: ReadRecipe }>(),
    createFailure: props<{ error: HttpErrorResponse }>(),

    delete: props<{ recipeId: number; token: string }>(),
    deleteSuccess: props<{ recipe: ReadRecipe }>(),
    deleteFailure: props<{ error: HttpErrorResponse }>(),

    update: props<{ recipe: UpdateRecipeExtended; token: string }>(),
    updateSuccess: props<{ recipe: ReadRecipe }>(),
    updateFailure: props<{ error: HttpErrorResponse }>(),
  },
});

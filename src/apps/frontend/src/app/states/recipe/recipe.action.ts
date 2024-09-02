import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { CreateRecipeExtended, ReadRecipe, UpdateRecipeExtended } from "../../api/recipe.api";

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

    create: props<{ recipe: CreateRecipeExtended }>(),
    createSuccess: props<{ recipe: ReadRecipe }>(),
    createFailure: props<{ error: HttpErrorResponse }>(),

    delete: props<{ recipeId: number }>(),
    deleteSuccess: props<{ recipe: ReadRecipe }>(),
    deleteFailure: props<{ error: HttpErrorResponse }>(),

    update: props<{ recipe: UpdateRecipeExtended }>(),
    updateSuccess: props<{ recipe: ReadRecipe }>(),
    updateFailure: props<{ error: HttpErrorResponse }>(),
  },
});

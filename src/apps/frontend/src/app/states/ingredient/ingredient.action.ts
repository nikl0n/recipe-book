import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, props } from "@ngrx/store";
import { ReadIngredient } from "../../api/ingredients.api";

export const IngredientActions = createActionGroup({
  source: "Ingredient",
  events: {
    setLastFetched: props<{ componentName: string }>(),

    fetchByRecipeId: props<{ recipeId: number }>(),
    fetchByRecipeIdSuccess: props<{ ingredients: ReadIngredient[] }>(),
    fetchByRecipeIdFailure: props<{ error: HttpErrorResponse }>(),
  },
});

import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { RecipeApi } from "../../api/recipe.api";
import { IngredientActions } from "./ingredient.action";

@Injectable()
export class ImageEffect {
  actions$ = inject(Actions);
  recipeApi = inject(RecipeApi);

  fetchByRecipeId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientActions.fetchByRecipeId),
      switchMap(({ recipeId }) =>
        this.recipeApi.fetchManyIngredientsByRecipeId(recipeId).pipe(
          map((ingredients) => IngredientActions.fetchByRecipeIdSuccess({ ingredients })),
          catchError((error: HttpErrorResponse) =>
            of(IngredientActions.fetchByRecipeIdFailure({ error }))
          )
        )
      )
    )
  );
}

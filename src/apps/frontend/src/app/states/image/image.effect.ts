import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { RecipeApi } from "../../api/recipe.api";
import { ImageActions } from "./image.action";

@Injectable()
export class ImageEffect {
  actions$ = inject(Actions);
  recipeApi = inject(RecipeApi);

  fetchByRecipeId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.fetchByRecipeId),
      switchMap(({ recipeId }) =>
        this.recipeApi.fetchManyImagesByRecipeId(recipeId).pipe(
          map((images) => ImageActions.fetchByRecipeIdSuccess({ images })),
          catchError((error: HttpErrorResponse) =>
            of(ImageActions.fetchByRecipeIdFailure({ error }))
          )
        )
      )
    )
  );
}

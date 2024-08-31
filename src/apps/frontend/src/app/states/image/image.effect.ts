import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { ImageApi } from "../../api/image.api";
import { RecipeApi } from "../../api/recipe.api";
import { ImageActions } from "./image.action";

@Injectable()
export class ImageEffect {
  actions$ = inject(Actions);
  imageApi = inject(ImageApi);
  recipeApi = inject(RecipeApi);

  fetchMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.fetchMany),
      switchMap(() =>
        this.imageApi.fetchMany().pipe(
          map((images) => ImageActions.fetchManySuccess({ images })),
          catchError((error: HttpErrorResponse) => of(ImageActions.fetchManyFailure({ error })))
        )
      )
    )
  );

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

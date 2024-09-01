import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { RecipeApi } from "../../api/recipe.api";
import { RecipeActions } from "./recipe.action";

@Injectable()
export class RecipeEffect {
  actions$ = inject(Actions);
  recipeApi = inject(RecipeApi);

  fetchAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.fetchAll),
      switchMap(() =>
        this.recipeApi.fetchMany().pipe(
          map((recipes) => RecipeActions.fetchAllSuccess({ recipes })),
          catchError((error: HttpErrorResponse) => of(RecipeActions.fetchAllFailure({ error })))
        )
      )
    )
  );

  fetchById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.fetchById),
      switchMap(({ recipeId }) =>
        this.recipeApi.fetchById(recipeId).pipe(
          map((recipe) => RecipeActions.fetchByIdSuccess({ recipe })),
          catchError((error: HttpErrorResponse) => of(RecipeActions.fetchByIdFailure({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.create),
      switchMap(({ recipe }) =>
        this.recipeApi.create(recipe).pipe(
          map((recipe) => RecipeActions.createSuccess({ recipe })),
          catchError((error: HttpErrorResponse) => of(RecipeActions.createFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.delete),
      switchMap(({ recipeId }) =>
        this.recipeApi.delete(recipeId).pipe(
          map((recipe) => RecipeActions.deleteSuccess({ recipe })),
          catchError((error: HttpErrorResponse) => of(RecipeActions.deleteFailure({ error })))
        )
      )
    )
  );
}

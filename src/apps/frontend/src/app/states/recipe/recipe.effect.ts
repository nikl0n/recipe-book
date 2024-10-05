import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { RecipeApi } from "../../api/recipe.api";
import { RecipeActions } from "./recipe.action";

@Injectable()
export class RecipeEffect {
  router = inject(Router);
  snackBar = inject(MatSnackBar);
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
      switchMap(({ recipe, token }) =>
        this.recipeApi.create(recipe, token).pipe(
          map((recipe) => RecipeActions.createSuccess({ recipe })),
          tap(({ recipe }) => {
            this.router.navigateByUrl(`recipes/${recipe.id}`);

            this.snackBar.open("Rezept wurde erfolgreich erstellt", undefined, { duration: 5000 });
          }),
          catchError((error: HttpErrorResponse) => of(RecipeActions.createFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.delete),
      switchMap(({ recipeId, token }) =>
        this.recipeApi.delete(recipeId, token).pipe(
          map((recipe) => RecipeActions.deleteSuccess({ recipe })),
          catchError((error: HttpErrorResponse) => of(RecipeActions.deleteFailure({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.update),
      switchMap(({ recipe, token }) =>
        this.recipeApi.update(recipe, token).pipe(
          map((recipe) => RecipeActions.updateSuccess({ recipe })),
          catchError((error: HttpErrorResponse) => of(RecipeActions.updateFailure({ error })))
        )
      )
    )
  );
}

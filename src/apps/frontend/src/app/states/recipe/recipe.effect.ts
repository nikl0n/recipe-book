import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";

import { RecipeApi } from "../../api/recipe.api";
import { RecipeActions } from "./recipe.action";

@Injectable()
export class RecipeEffect {
  constructor(
    private actions$: Actions,
    private recipeApi: RecipeApi
  ) {}

  fetchAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.fetchAll),
      exhaustMap(() =>
        this.recipeApi.fetchAllRecipes().pipe(
          map((recipes) => RecipeActions.fetchAllSuccess({ recipes })),
          catchError((error: HttpErrorResponse) => of(RecipeActions.fetchAllFailure({ error })))
        )
      )
    )
  );
}

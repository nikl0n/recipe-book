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
        this.recipeApi.fetchAllRecipes().pipe(
          map((recipes) => RecipeActions.fetchAllSuccess({ recipes })),
          catchError((error: HttpErrorResponse) => of(RecipeActions.fetchAllFailure({ error })))
        )
      )
    )
  );
}

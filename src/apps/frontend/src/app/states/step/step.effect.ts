import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { RecipeApi } from "../../api/recipe.api";
import { StepActions } from "./step.action";

@Injectable()
export class StepEffect {
  actions$ = inject(Actions);
  recipeApi = inject(RecipeApi);

  fetchByRecipeId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StepActions.fetchByRecipeId),
      switchMap(({ recipeId }) =>
        this.recipeApi.fetchManyStepsByRecipeId(recipeId).pipe(
          map((steps) => StepActions.fetchByRecipeIdSuccess({ steps })),
          catchError((error: HttpErrorResponse) =>
            of(StepActions.fetchByRecipeIdFailure({ error }))
          )
        )
      )
    )
  );
}

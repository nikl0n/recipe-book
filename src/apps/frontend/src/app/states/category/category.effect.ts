import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { CategoryApi } from "../../api/category.api";
import { CategoryActions } from "./category.action";

@Injectable()
export class CategoryEffect {
  actions$ = inject(Actions);
  categoryApi = inject(CategoryApi);

  fetchAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.fetchAll),
      switchMap(() =>
        this.categoryApi.fetchMany().pipe(
          map((categories) => CategoryActions.fetchAllSuccess({ categories })),
          catchError((error: HttpErrorResponse) => of(CategoryActions.fetchAllFailure({ error })))
        )
      )
    )
  );
}

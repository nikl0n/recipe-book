import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { UnitApi } from "../../api/unit.api";
import { GlobalUnitActions } from "./unit.action";

@Injectable()
export class UnitEffect {
  actions$ = inject(Actions);
  unitApi = inject(UnitApi);

  fetchAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlobalUnitActions.fetchAll),
      switchMap(() =>
        this.unitApi.fetchMany().pipe(
          map((units) => GlobalUnitActions.fetchAllSuccess({ units })),
          catchError((error: HttpErrorResponse) => of(GlobalUnitActions.fetchAllFailure({ error })))
        )
      )
    )
  );
}

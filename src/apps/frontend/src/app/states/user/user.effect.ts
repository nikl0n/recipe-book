import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { UserApi } from "../../api/user.api";
import { UserActions } from "./user.action";

@Injectable()
export class UserEffect {
  actions$ = inject(Actions);
  userApi = inject(UserApi);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(({ user }) =>
        this.userApi.login(user).pipe(
          map((user) => UserActions.loginSuccess({ user })),
          tap(({ user }) => {
            localStorage.setItem("user", JSON.stringify(user));
          }),
          catchError((error: HttpErrorResponse) => of(UserActions.loginFailure({ error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      switchMap(({ user }) =>
        this.userApi.register(user).pipe(
          map((user) => UserActions.registerSuccess({ user })),
          tap(({ user }) => {
            localStorage.setItem("user", JSON.stringify(user));
          }),
          catchError((error: HttpErrorResponse) => of(UserActions.registerFailure({ error })))
        )
      )
    )
  );
}

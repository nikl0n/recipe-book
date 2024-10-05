import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { UserApi } from "../../api/user.api";
import { UserActions } from "./user.action";

@Injectable()
export class UserEffect {
  actions$ = inject(Actions);
  userApi = inject(UserApi);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(({ user }) =>
        this.userApi.login(user).pipe(
          map((user) => UserActions.loginSuccess({ user })),
          tap(({ user }) => {
            localStorage.setItem("user", JSON.stringify(user));

            this.snackBar.open("Erfolgreich angemeldet", "Ok", { duration: 5000 });

            this.router.navigateByUrl("recipes");
          }),
          catchError((error: HttpErrorResponse) => {
            this.snackBar.open("Beim anmelden ist ein Fehler aufgetreten", "Ok", {
              duration: 5000,
            });

            return of(UserActions.loginFailure({ error }));
          })
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

            this.snackBar.open("Erfolgreich registriert", "Ok", { duration: 5000 });

            this.router.navigateByUrl("recipes");
          }),
          catchError((error: HttpErrorResponse) => {
            this.snackBar.open("Beim registrieren ist ein Fehler aufgetreten", "Ok", {
              duration: 5000,
            });

            return of(UserActions.loginFailure({ error }));
          })
        )
      )
    )
  );
}

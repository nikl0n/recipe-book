import { Component, effect, inject } from "@angular/core";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";

import { Store } from "@ngrx/store";

import { CreateUser } from "../../api/user.api";
import { AuthComponent } from "../../components/auth/auth.component";
import { UserActions } from "../../states/user/user.action";
import { UserSelectStatus } from "../../states/user/user.reducer";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [AuthComponent],
  templateUrl: "./login.page.html",
  styleUrl: "./login.page.scss",
})
export class LoginPage {
  store = inject(Store);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  userStatus = this.store.selectSignal(UserSelectStatus);

  loginEffect = effect(() => {
    if (this.userStatus() === "SUCCESS") {
      this.snackBar.open("Erfolgreich angemeldet", undefined, { duration: 5000 });

      this.router.navigateByUrl("recipes");
    }

    if (this.userStatus() === "ERROR") {
      this.snackBar.open("Beim anmelden ist ein Fehler aufgetreten", undefined, {
        duration: 5000,
      });
    }
  });

  login(user: CreateUser) {
    this.store.dispatch(UserActions.login({ user }));
  }
}

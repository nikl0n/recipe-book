import { Component, effect, inject } from "@angular/core";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";

import { Store } from "@ngrx/store";

import { CreateUser } from "../../api/user.api";
import { AuthComponent } from "../../components/auth/auth.component";
import { BackButtonComponent } from "../../components/back-button/back-button.component";
import { UserActions } from "../../states/user/user.action";
import { UserSelectStatus } from "../../states/user/user.reducer";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [AuthComponent, BackButtonComponent],
  templateUrl: "./register.page.html",
  styleUrl: "./register.page.scss",
})
export class RegisterPage {
  store = inject(Store);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  userStatus = this.store.selectSignal(UserSelectStatus);

  registerEffect = effect(() => {
    if (this.userStatus() === "SUCCESS") {
      this.snackBar.open("Erfolgreich registriert", "Ok", { duration: 5000 });

      this.router.navigateByUrl("recipes");
    }

    if (this.userStatus() === "ERROR") {
      this.snackBar.open("Beim registrieren ist ein Fehler aufgetreten", "Ok", {
        duration: 5000,
      });
    }
  });

  register(user: CreateUser) {
    this.store.dispatch(UserActions.register({ user }));
  }
}

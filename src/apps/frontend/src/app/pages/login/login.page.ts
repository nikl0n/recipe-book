import { Component, computed, effect, inject } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Store } from "@ngrx/store";

import { CreateUser } from "../../api/user.api";
import { UserActions } from "../../states/user/user.action";
import { UserSelectStatus } from "../../states/user/user.reducer";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: "./login.page.html",
  styleUrl: "./login.page.scss",
})
export class LoginPage {
  store = inject(Store);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  userStatus = this.store.selectSignal(UserSelectStatus);

  form = this.formBuilder.group({
    username: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(50)]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(250),
    ]),
  });

  isFetching = computed(() => this.userStatus() === "LOADING");

  loginEffect = effect(() => {
    if (this.userStatus() === "SUCCESS") {
      this.snackBar.open("Erfolgreich eingeloggt", undefined, { duration: 5000 });

      this.router.navigateByUrl("recipes");
    }

    if (this.userStatus() === "ERROR") {
      this.snackBar.open("Beim Anmelden ist ein Fehler aufgetreten", undefined, { duration: 5000 });
    }
  });

  login() {
    if (this.form.invalid) return;

    const username = this.form.controls.username.value;
    const password = this.form.controls.password.value;

    if (!username || !password) return;

    const user: CreateUser = {
      username,
      password,
    };

    this.store.dispatch(UserActions.login({ user }));
  }
}

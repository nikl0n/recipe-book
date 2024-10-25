import { Component, computed, inject, input, output } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { CreateUser } from "@packages/types";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Store } from "@ngrx/store";

import { UserSelectStatus } from "../../states/user/user.reducer";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss",
})
export class AuthComponent {
  store = inject(Store);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  action = input.required<"login" | "register">();

  onCreateUser = output<CreateUser>();

  userStatus = this.store.selectSignal(UserSelectStatus);

  form = this.formBuilder.group({
    username: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(50)]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(250),
    ]),
  });

  isFetching = computed(() => this.userStatus() === "LOADING");

  auth() {
    if (this.form.invalid) return;

    const name = this.form.controls.username.value;
    const password = this.form.controls.password.value;

    if (!name || !password) return;

    const user: CreateUser = {
      name,
      password,
    };

    this.onCreateUser.emit(user);
  }
}

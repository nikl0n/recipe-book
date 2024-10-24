import { Component, inject } from "@angular/core";

import { CreateUser } from "@monorepo/types";

import { Store } from "@ngrx/store";

import { AuthComponent } from "../../components/auth/auth.component";
import { BackButtonComponent } from "../../components/back-button/back-button.component";
import { UserActions } from "../../states/user/user.action";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [AuthComponent, BackButtonComponent],
  templateUrl: "./register.page.html",
  styleUrl: "./register.page.scss",
})
export class RegisterPage {
  store = inject(Store);

  register(user: CreateUser) {
    this.store.dispatch(UserActions.register({ user }));
  }
}

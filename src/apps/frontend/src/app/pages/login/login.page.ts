import { Component, inject } from "@angular/core";

import { CreateUser } from "@monorepo/types";

import { Store } from "@ngrx/store";

import { AuthComponent } from "../../components/auth/auth.component";
import { BackButtonComponent } from "../../components/back-button/back-button.component";
import { UserActions } from "../../states/user/user.action";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [AuthComponent, BackButtonComponent],
  templateUrl: "./login.page.html",
  styleUrl: "./login.page.scss",
})
export class LoginPage {
  store = inject(Store);

  login(user: CreateUser) {
    this.store.dispatch(UserActions.login({ user }));
  }
}

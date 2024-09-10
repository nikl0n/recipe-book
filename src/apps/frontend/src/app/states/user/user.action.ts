import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { CreateUser, ReadUser } from "../../api/user.api";

export const UserActions = createActionGroup({
  source: "User",
  events: {
    setUser: props<{ user: ReadUser }>(),

    deleteUser: emptyProps(),

    login: props<{ user: CreateUser }>(),
    loginSuccess: props<{ user: ReadUser }>(),
    loginFailure: props<{ error: HttpErrorResponse }>(),

    register: props<{ user: CreateUser }>(),
    registerSuccess: props<{ user: ReadUser }>(),
    registerFailure: props<{ error: HttpErrorResponse }>(),
  },
});

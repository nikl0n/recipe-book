import { createFeature, createReducer, on } from "@ngrx/store";

import { ReadUser } from "../../api/user.api";
import { UserActions } from "./user.action";

interface UserState {
  user: ReadUser | null;
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  statusAction: "CREATE" | "READ" | "UPDATE" | "DELETE";
}

const initialState: UserState = {
  user: null,
  status: "IDLE",
  statusAction: "READ",
};

export const userFeature = createFeature({
  name: "user",
  reducer: createReducer(
    initialState,
    on(UserActions.setUser, (state, { user }) => ({
      ...state,
      user,
    })),

    on(UserActions.login, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "READ" as const,
    })),

    on(UserActions.loginSuccess, (state, { user }) => ({
      ...state,
      status: "SUCCESS" as const,
      user,
    })),

    on(UserActions.loginFailure, (state) => ({
      ...state,
      status: "ERROR" as const,
      user: null,
    }))
  ),
});

export const {
  name,
  reducer,
  selectUser: UserSelectUser,
  selectStatus: UserSelectStatus,
  selectStatusAction: UserSelectStatusAction,
} = userFeature;

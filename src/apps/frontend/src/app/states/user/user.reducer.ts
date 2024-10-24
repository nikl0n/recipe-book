import { ReadUser } from "@monorepo/types";

import { createFeature, createReducer, on } from "@ngrx/store";

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

    on(UserActions.deleteUser, (state) => ({
      ...state,
      user: null,
      status: "IDLE" as const,
    })),

    on(UserActions.login, UserActions.register, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "READ" as const,
    })),

    on(UserActions.loginSuccess, UserActions.registerSuccess, (state, { user }) => ({
      ...state,
      status: "SUCCESS" as const,
      user,
    })),

    on(UserActions.loginFailure, UserActions.registerFailure, (state) => ({
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

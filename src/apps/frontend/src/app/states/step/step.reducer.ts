import { createFeature, createReducer, on } from "@ngrx/store";

import { Step } from "../../api/step.api";
import { StepActions } from "./step.action";

interface StepState {
  steps: Step[];
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  statusAction: "CREATE" | "READ" | "UPDATE" | "DELETE";
}

const initialState: StepState = {
  steps: [],
  status: "IDLE",
  statusAction: "READ",
};

export const stepFeature = createFeature({
  name: "step",
  reducer: createReducer(
    initialState,
    on(StepActions.fetchByRecipeId, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "READ" as const,
    })),

    on(StepActions.fetchByRecipeIdSuccess, (state, { steps }) => ({
      ...state,
      status: "SUCCESS" as const,
      steps,
    })),

    on(StepActions.fetchByRecipeIdFailure, (state) => ({
      ...state,
      status: "ERROR" as const,
      steps: [],
    }))
  ),
});

export const {
  name,
  reducer,
  selectSteps: StepSelectSteps,
  selectStatus: StepSelectStatus,
  selectStatusAction: StepSelectStatusAction,
} = stepFeature;

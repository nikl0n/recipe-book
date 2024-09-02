import { createFeature, createReducer, on } from "@ngrx/store";

import { ReadStep } from "../../api/step.api";
import { StepActions } from "./step.action";

interface StepState {
  steps: ReadStep[];
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  statusAction: "CREATE" | "READ" | "UPDATE" | "DELETE";
  lastFetched: string | null;
}

const initialState: StepState = {
  steps: [],
  status: "IDLE",
  statusAction: "READ",
  lastFetched: null,
};

export const stepFeature = createFeature({
  name: "step",
  reducer: createReducer(
    initialState,
    on(StepActions.setLastFetched, (state, { componentName }) => ({
      ...state,
      lastFetched: componentName,
    })),

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

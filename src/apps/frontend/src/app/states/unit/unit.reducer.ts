import { ReadUnit } from "@repo/types";

import { createFeature, createReducer, on } from "@ngrx/store";

import { GlobalUnitActions } from "./unit.action";

interface UnitState {
  units: ReadUnit[];
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  statusAction: "CREATE" | "READ" | "UPDATE" | "DELETE";
}

const initialState: UnitState = {
  units: [],
  status: "IDLE",
  statusAction: "READ",
};

export const unitFeature = createFeature({
  name: "unit",
  reducer: createReducer(
    initialState,
    on(GlobalUnitActions.fetchAll, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "READ" as const,
    })),

    on(GlobalUnitActions.fetchAllSuccess, (state, { units }) => ({
      ...state,
      status: "SUCCESS" as const,
      units,
    })),

    on(GlobalUnitActions.fetchAllFailure, (state) => ({
      ...state,
      status: "ERROR" as const,
      units: [],
    }))
  ),
});

export const {
  name,
  reducer,
  selectUnits: UnitSelectUnits,
  selectStatus: UnitSelectStatus,
  selectStatusAction: UnitSelectStatusAction,
} = unitFeature;

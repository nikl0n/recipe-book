import { createFeature, createReducer, on } from "@ngrx/store";

import { Category } from "../../api/category.api";
import { GlobalCategoryActions } from "./category.action";

interface CategoryState {
  categories: Category[];
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  statusAction: "CREATE" | "READ" | "UPDATE" | "DELETE";
}

const initialState: CategoryState = {
  categories: [],
  status: "IDLE",
  statusAction: "READ",
};

export const categoryFeature = createFeature({
  name: "category",
  reducer: createReducer(
    initialState,
    on(GlobalCategoryActions.fetchAll, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "READ" as const,
    })),

    on(GlobalCategoryActions.fetchAllSuccess, (state, { categories }) => ({
      ...state,
      status: "SUCCESS" as const,
      categories,
    })),

    on(GlobalCategoryActions.fetchAllFailure, (state) => ({
      ...state,
      status: "ERROR" as const,
      categories: [],
    }))
  ),
});

export const {
  name,
  reducer,
  selectCategories: CategorySelectCategories,
  selectStatus: CategorySelectStatus,
  selectStatusAction: CategorySelectStatusAction,
} = categoryFeature;

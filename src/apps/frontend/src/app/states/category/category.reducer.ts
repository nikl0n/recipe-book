import { createFeature, createReducer, createSelector, on } from "@ngrx/store";

import { ReadCategory } from "@repo/types";

import { GlobalCategoryActions } from "./category.action";

interface CategoryState {
  categories: ReadCategory[];
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
  extraSelectors: ({ selectCategories }) => {
    const selectCategoryById = (categoryId: number) =>
      createSelector(selectCategories, (categories) =>
        categories.find((category) => category.id === categoryId)
      );

    return { selectCategoryById };
  },
});

export const {
  name,
  reducer,
  selectCategories: CategorySelectCategories,
  selectStatus: CategorySelectStatus,
  selectStatusAction: CategorySelectStatusAction,
  selectCategoryById: CategorySelectCategoryById,
} = categoryFeature;

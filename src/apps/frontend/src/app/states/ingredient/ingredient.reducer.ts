import { createFeature, createReducer, createSelector, on } from "@ngrx/store";

import { ReadIngredient } from "@repo/types";

import { IngredientActions } from "./ingredient.action";

interface IngredientState {
  ingredients: ReadIngredient[];
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  statusAction: "CREATE" | "READ" | "UPDATE" | "DELETE";
  lastFetched: string | null;
}

const initialState: IngredientState = {
  ingredients: [],
  status: "IDLE",
  statusAction: "READ",
  lastFetched: null,
};

export const ingredientFeature = createFeature({
  name: "ingredient",
  reducer: createReducer(
    initialState,
    on(IngredientActions.setLastFetched, (state, { componentName }) => ({
      ...state,
      lastFetched: componentName,
    })),

    on(IngredientActions.fetchByRecipeId, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "READ" as const,
    })),

    on(IngredientActions.fetchByRecipeIdSuccess, (state, { ingredients }) => ({
      ...state,
      status: "SUCCESS" as const,
      ingredients,
    })),

    on(IngredientActions.fetchByRecipeIdFailure, (state) => ({
      ...state,
      status: "ERROR" as const,
      ingredients: [],
    }))
  ),
  extraSelectors: ({ selectIngredients }) => {
    const selectIngredientsByRecipeId = (recipeId: number | undefined) =>
      createSelector(selectIngredients, (ingredients) =>
        ingredients.filter((ingredient) => ingredient.recipeId === recipeId)
      );

    return { selectIngredientsByRecipeId };
  },
});

export const {
  name,
  reducer,
  selectIngredients: IngredientSelectIngredients,
  selectStatus: IngredientSelectStatus,
  selectStatusAction: IngredientSelectStatusAction,
  selectIngredientsByRecipeId: IngredientSelectIngredientsByRecipeId,
} = ingredientFeature;

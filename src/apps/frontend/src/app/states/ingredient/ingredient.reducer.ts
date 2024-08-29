import { createFeature, createReducer, on } from "@ngrx/store";

import { Ingredient } from "../../api/ingredients.api";
import { IngredientActions } from "./ingredient.action";

interface IngredientState {
  ingredients: Ingredient[];
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  statusAction: "CREATE" | "READ" | "UPDATE" | "DELETE";
}

const initialState: IngredientState = {
  ingredients: [],
  status: "IDLE",
  statusAction: "READ",
};

export const ingredientFeature = createFeature({
  name: "ingredient",
  reducer: createReducer(
    initialState,
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
});

export const {
  name,
  reducer,
  selectIngredients: IngredientSelectIngredients,
  selectStatus: IngredientSelectStatus,
  selectStatusAction: IngredientSelectStatusAction,
} = ingredientFeature;

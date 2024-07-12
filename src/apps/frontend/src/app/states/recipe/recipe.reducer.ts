import { createFeature, createReducer, createSelector, on } from "@ngrx/store";

import { Recipe } from "../../api/recipe.api";
import { RecipeActions } from "./recipe.action";

interface RecipeState {
  recipes: Recipe[];
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  statusAction: "CREATE" | "READ" | "UPDATE" | "DELETE";
}

const initialState: RecipeState = {
  recipes: [],
  status: "IDLE",
  statusAction: "READ",
};

export const recipeFeature = createFeature({
  name: "recipe",
  reducer: createReducer(
    initialState,
    on(RecipeActions.fetchAll, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "READ" as const,
    })),
    on(RecipeActions.fetchAllSuccess, (state, { recipes }) => ({
      ...state,
      status: "SUCCESS" as const,
      recipes,
    })),
    on(RecipeActions.fetchAllFailure, (state) => ({
      ...state,
      status: "ERROR" as const,
      recipes: [],
    }))
  ),
  extraSelectors: ({ selectRecipes }) => {
    const selectRecipeById = (recipeId: number) =>
      createSelector(selectRecipes, (recipes) => recipes.find((recipe) => recipe.id === recipeId));

    return { selectRecipeById };
  },
});

export const {
  name,
  reducer,
  selectRecipes,
  selectStatus,
  selectStatusAction,
  selectRecipeState,
  selectRecipeById,
} = recipeFeature;

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
    on(RecipeActions.fetchAll, RecipeActions.fetchById, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "READ" as const,
    })),

    on(RecipeActions.fetchAllSuccess, (state, { recipes }) => ({
      ...state,
      status: "SUCCESS" as const,
      recipes,
    })),

    on(RecipeActions.fetchByIdSuccess, (state, { recipe }) => {
      let recipes = [...state.recipes];

      const oldRecipeIndex = recipes.findIndex((oldRecipe) => oldRecipe.id === recipe.id);
      if (oldRecipeIndex === -1) {
        recipes = [...recipes, recipe];
      } else {
        recipes[oldRecipeIndex] = recipe;
      }

      return {
        ...state,
        status: "SUCCESS" as const,
        recipes,
      };
    }),

    on(RecipeActions.fetchAllFailure, RecipeActions.fetchByIdFailure, (state) => ({
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
  selectRecipes: RecipeSelectRecipes,
  selectStatus: RecipeSelectStatus,
  selectStatusAction: RecipeSelectStatusAction,
  selectRecipeById: RecipeSelectRecipeById,
} = recipeFeature;

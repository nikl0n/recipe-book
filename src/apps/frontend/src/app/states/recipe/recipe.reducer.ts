import { createFeature, createReducer, createSelector, on } from "@ngrx/store";

import { ReadRecipe } from "@packages/types";

import { RecipeActions } from "./recipe.action";

interface RecipeState {
  recipes: ReadRecipe[];
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  statusAction: "CREATE" | "READ" | "UPDATE" | "DELETE";
  lastFetched: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  status: "IDLE",
  statusAction: "READ",
  lastFetched: null,
};

export const recipeFeature = createFeature({
  name: "recipe",
  reducer: createReducer(
    initialState,

    on(RecipeActions.setLastFetched, (state, { componentName }) => ({
      ...state,
      lastFetched: componentName,
    })),

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

    on(RecipeActions.fetchByIdSuccess, RecipeActions.createSuccess, (state, { recipe }) => {
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

    on(RecipeActions.create, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "CREATE" as const,
    })),

    on(RecipeActions.update, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "UPDATE" as const,
    })),

    on(RecipeActions.delete, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "DELETE" as const,
    })),

    on(RecipeActions.deleteSuccess, (state, { recipe }) => ({
      ...state,
      recipes: state.recipes.filter((r) => r.id !== recipe.id),
      status: "SUCCESS" as const,
    })),

    on(RecipeActions.updateSuccess, (state, { recipe }) => ({
      ...state,
      recipes: state.recipes.map((stateRecipe) => {
        if (stateRecipe.id === recipe.id) return recipe;

        return stateRecipe;
      }),
      status: "SUCCESS" as const,
    })),

    on(
      RecipeActions.fetchAllFailure,
      RecipeActions.fetchByIdFailure,
      RecipeActions.createFailure,
      RecipeActions.deleteFailure,
      RecipeActions.updateFailure,
      (state) => ({
        ...state,
        status: "ERROR" as const,
        recipes: [],
      })
    )
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
  selectLastFetched: RecipeSelectLastFetched,
} = recipeFeature;

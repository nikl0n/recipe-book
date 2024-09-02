import { createFeature, createReducer, createSelector, on } from "@ngrx/store";

import { ReadImage } from "../../api/image.api";
import { ImageActions } from "./image.action";

interface ImageState {
  images: ReadImage[];
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  statusAction: "CREATE" | "READ" | "UPDATE" | "DELETE";
  lastFetched: string | null;
}

const initialState: ImageState = {
  images: [],
  status: "IDLE",
  statusAction: "READ",
  lastFetched: null,
};

export const imageFeature = createFeature({
  name: "image",
  reducer: createReducer(
    initialState,
    on(ImageActions.setLastFetched, (state, { componentName }) => ({
      ...state,
      lastFetched: componentName,
    })),

    on(ImageActions.fetchMany, ImageActions.fetchByRecipeId, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "READ" as const,
    })),

    on(ImageActions.fetchManySuccess, ImageActions.fetchByRecipeIdSuccess, (state, { images }) => ({
      ...state,
      status: "SUCCESS" as const,
      images,
    })),

    on(ImageActions.fetchManyFailure, ImageActions.fetchByRecipeIdFailure, (state) => ({
      ...state,
      status: "ERROR" as const,
      images: [],
    }))
  ),
  extraSelectors: ({ selectImages }) => {
    const selectImageByRecipeId = (recipeId: number | undefined) =>
      createSelector(selectImages, (images) => images.find((image) => image.recipeId === recipeId));

    return { selectImageByRecipeId };
  },
});

export const {
  name,
  reducer,
  selectImages: ImageSelectImages,
  selectStatus: ImageSelectStatus,
  selectStatusAction: ImageSelectStatusAction,
  selectLastFetched: ImageSelectLastFetched,
  selectImageByRecipeId: ImageSelectImageByRecipeId,
} = imageFeature;

import { createFeature, createReducer, on } from "@ngrx/store";

import { Image } from "../../api/image.api";
import { ImageActions } from "./image.action";

interface ImageState {
  images: Image[];
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  statusAction: "CREATE" | "READ" | "UPDATE" | "DELETE";
}

const initialState: ImageState = {
  images: [],
  status: "IDLE",
  statusAction: "READ",
};

export const imageFeature = createFeature({
  name: "image",
  reducer: createReducer(
    initialState,
    on(ImageActions.fetchByRecipeId, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "READ" as const,
    })),

    on(ImageActions.fetchByRecipeIdSuccess, (state, { images }) => ({
      ...state,
      status: "SUCCESS" as const,
      images,
    })),

    on(ImageActions.fetchByRecipeIdFailure, (state) => ({
      ...state,
      status: "ERROR" as const,
      images: [],
    }))
  ),
});

export const {
  name,
  reducer,
  selectImages: ImageSelectImages,
  selectStatus: ImageSelectStatus,
  selectStatusAction: ImageSelectStatusAction,
} = imageFeature;

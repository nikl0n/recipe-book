import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ReadImage } from "../../api/image.api";

export const ImageActions = createActionGroup({
  source: "Image",
  events: {
    setLastFetched: props<{ componentName: string }>(),

    fetchMany: emptyProps(),
    fetchManySuccess: props<{ images: ReadImage[] }>(),
    fetchManyFailure: props<{ error: HttpErrorResponse }>(),

    fetchByRecipeId: props<{ recipeId: number }>(),
    fetchByRecipeIdSuccess: props<{ images: ReadImage[] }>(),
    fetchByRecipeIdFailure: props<{ error: HttpErrorResponse }>(),
  },
});

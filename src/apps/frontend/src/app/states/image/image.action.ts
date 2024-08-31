import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { Image } from "../../api/image.api";

export const ImageActions = createActionGroup({
  source: "Image",
  events: {
    setLastFetched: props<{ componentName: string }>(),

    fetchMany: emptyProps(),
    fetchManySuccess: props<{ images: Image[] }>(),
    fetchManyFailure: props<{ error: HttpErrorResponse }>(),

    fetchByRecipeId: props<{ recipeId: number }>(),
    fetchByRecipeIdSuccess: props<{ images: Image[] }>(),
    fetchByRecipeIdFailure: props<{ error: HttpErrorResponse }>(),
  },
});

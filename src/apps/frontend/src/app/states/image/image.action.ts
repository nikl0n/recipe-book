import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, props } from "@ngrx/store";

import { Image } from "../../api/image.api";

export const ImageActions = createActionGroup({
  source: "Image",
  events: {
    fetchByRecipeId: props<{ recipeId: number }>(),
    fetchByRecipeIdSuccess: props<{ images: Image[] }>(),
    fetchByRecipeIdFailure: props<{ error: HttpErrorResponse }>(),
  },
});

import { HttpErrorResponse } from "@angular/common/http";

import { ReadStep } from "@packages/types";

import { createActionGroup, props } from "@ngrx/store";

export const StepActions = createActionGroup({
  source: "Step",
  events: {
    setLastFetched: props<{ componentName: string }>(),

    fetchByRecipeId: props<{ recipeId: number }>(),
    fetchByRecipeIdSuccess: props<{ steps: ReadStep[] }>(),
    fetchByRecipeIdFailure: props<{ error: HttpErrorResponse }>(),
  },
});

import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, props } from "@ngrx/store";

import { Step } from "../../api/step.api";

export const StepActions = createActionGroup({
  source: "Step",
  events: {
    setLastFetched: props<{ componentName: string }>(),

    fetchByRecipeId: props<{ recipeId: number }>(),
    fetchByRecipeIdSuccess: props<{ steps: Step[] }>(),
    fetchByRecipeIdFailure: props<{ error: HttpErrorResponse }>(),
  },
});

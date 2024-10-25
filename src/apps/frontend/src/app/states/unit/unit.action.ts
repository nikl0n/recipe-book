import { HttpErrorResponse } from "@angular/common/http";

import { ReadUnit } from "@packages/types";

import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const GlobalUnitActions = createActionGroup({
  source: "Unit",
  events: {
    fetchAll: emptyProps(),
    fetchAllSuccess: props<{ units: ReadUnit[] }>(),
    fetchAllFailure: props<{ error: HttpErrorResponse }>(),
  },
});

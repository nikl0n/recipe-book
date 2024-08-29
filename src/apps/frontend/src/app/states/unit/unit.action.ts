import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { Unit } from "../../api/unit.api";

export const GlobalUnitActions = createActionGroup({
  source: "Unit",
  events: {
    fetchAll: emptyProps(),
    fetchAllSuccess: props<{ units: Unit[] }>(),
    fetchAllFailure: props<{ error: HttpErrorResponse }>(),
  },
});

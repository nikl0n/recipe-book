import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { ReadCategory } from "@packages/types";

export const GlobalCategoryActions = createActionGroup({
  source: "Category",
  events: {
    fetchAll: emptyProps(),
    fetchAllSuccess: props<{ categories: ReadCategory[] }>(),
    fetchAllFailure: props<{ error: HttpErrorResponse }>(),
  },
});

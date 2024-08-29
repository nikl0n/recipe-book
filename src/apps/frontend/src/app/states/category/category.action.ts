import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { Category } from "../../api/category.api";

export const GlobalCategoryActions = createActionGroup({
  source: "Category",
  events: {
    fetchAll: emptyProps(),
    fetchAllSuccess: props<{ categories: Category[] }>(),
    fetchAllFailure: props<{ error: HttpErrorResponse }>(),
  },
});

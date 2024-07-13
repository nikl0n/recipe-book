import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { Course } from "../../api/course.api";

export const CourseActions = createActionGroup({
  source: "Course",
  events: {
    fetchAll: emptyProps(),
    fetchAllSuccess: props<{ courses: Course[] }>(),
    fetchAllFailure: props<{ error: HttpErrorResponse }>(),
  },
});

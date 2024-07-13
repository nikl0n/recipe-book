import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { CourseApi } from "../../api/course.api";
import { CourseActions } from "./course.action";

@Injectable()
export class CourseEffect {
  actions$ = inject(Actions);
  courseApi = inject(CourseApi);

  fetchAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.fetchAll),
      switchMap(() =>
        this.courseApi.fetchAllCourses().pipe(
          map((courses) => CourseActions.fetchAllSuccess({ courses })),
          catchError((error: HttpErrorResponse) => of(CourseActions.fetchAllFailure({ error })))
        )
      )
    )
  );
}

import { createFeature, createReducer, createSelector, on } from "@ngrx/store";

import { Course } from "../../api/course.api";
import { CourseActions } from "./course.action";

interface CourseState {
  courses: Course[];
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  statusAction: "CREATE" | "READ" | "UPDATE" | "DELETE";
}

const initialState: CourseState = {
  courses: [],
  status: "IDLE",
  statusAction: "READ",
};

export const courseFeature = createFeature({
  name: "course",
  reducer: createReducer(
    initialState,
    on(CourseActions.fetchAll, CourseActions.fetchById, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "READ" as const,
    })),
    on(CourseActions.fetchAllSuccess, (state, { courses }) => ({
      ...state,
      status: "SUCCESS" as const,
      courses,
    })),
    on(CourseActions.fetchByIdSuccess, (state, { course }) => {
      let courses = [...state.courses];

      const oldCourseIndex = courses.findIndex((oldCourse) => oldCourse.id === course.id);
      if (oldCourseIndex === -1) {
        courses = [...courses, course];
      } else {
        courses[oldCourseIndex] = course;
      }

      return {
        ...state,
        status: "SUCCESS" as const,
        courses,
      };
    }),
    on(CourseActions.fetchAllFailure, CourseActions.fetchByIdFailure, (state) => ({
      ...state,
      status: "ERROR" as const,
      courses: [],
    }))
  ),
  extraSelectors: ({ selectCourses }) => {
    const selectCourseById = (courseId: number) =>
      createSelector(selectCourses, (courses) => courses.find((course) => course.id === courseId));

    return { selectCourseById };
  },
});

export const {
  name,
  reducer,
  selectCourses: CourseSelectCourses,
  selectStatus: CourseSelectStatus,
  selectStatusAction: CourseSelectStatusAction,
  selectCourseById: CourseSelectCourseById,
} = courseFeature;

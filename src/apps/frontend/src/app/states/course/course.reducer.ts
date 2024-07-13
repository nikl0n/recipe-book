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
    on(CourseActions.fetchAll, (state) => ({
      ...state,
      status: "LOADING" as const,
      statusAction: "READ" as const,
    })),
    on(CourseActions.fetchAllSuccess, (state, { courses }) => ({
      ...state,
      status: "SUCCESS" as const,
      courses,
    })),
    on(CourseActions.fetchAllFailure, (state) => ({
      ...state,
      status: "ERROR" as const,
      recipes: [],
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
  selectCourses,
  selectStatus,
  selectStatusAction,
  selectCourseState,
  selectCourseById,
} = courseFeature;

import { Injectable } from "@angular/core";
import { delay, of, throwError } from "rxjs";

export type Course = {
  id: number;
  name: string;
};

@Injectable({ providedIn: "root" })
export class CourseApi {
  courses: Course[] = [
    {
      id: 0,
      name: "Vorspeise",
    },
    {
      id: 1,
      name: "Hauptspeise",
    },
    {
      id: 2,
      name: "Nachspeise",
    },
    {
      id: 3,
      name: "Beilage",
    },
    {
      id: 4,
      name: "Snack",
    },
  ];

  fetchAll() {
    return of(this.courses).pipe(delay(500));
  }

  fetchById(courseId: number) {
    const course = this.courses.find((course) => course.id === courseId);

    if (!course) {
      return throwError(() => new Error(`no course found with id ${courseId}`));
    }

    return of(course).pipe(delay(500));
  }
}

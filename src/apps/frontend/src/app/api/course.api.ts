import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";

export type Course = {
  id: number;
  name: string;
};

@Injectable({ providedIn: "root" })
export class CourseApi {
  fetchAllCourses() {
    const courses: Course[] = [
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
        name: "Snack",
      },
    ];

    return of(courses).pipe(delay(500));
  }
}

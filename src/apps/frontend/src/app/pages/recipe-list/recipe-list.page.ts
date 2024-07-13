import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { Store } from "@ngrx/store";

import { MatChipListboxChange, MatChipsModule } from "@angular/material/chips";

import { Course } from "../../api/course.api";
import { LoadingComponent } from "../../components/loading/loading.component";
import { RecipeComponent } from "../../components/recipe/recipe.component";
import { CourseActions } from "../../states/course/course.action";
import { CourseSelectCourses, CourseSelectStatus } from "../../states/course/course.reducer";
import { RecipeActions } from "../../states/recipe/recipe.action";
import { RecipeSelectRecipes, RecipeSelectStatus } from "../../states/recipe/recipe.reducer";

@Component({
  selector: "app-recipe-list",
  standalone: true,
  imports: [MatChipsModule, RecipeComponent, LoadingComponent],
  templateUrl: "./recipe-list.page.html",
  styleUrl: "./recipe-list.page.scss",
})
export class RecipeListPage implements OnInit {
  store = inject(Store);

  recipeStatus = this.store.selectSignal(RecipeSelectStatus);
  recipes = this.store.selectSignal(RecipeSelectRecipes);

  courseStatus = this.store.selectSignal(CourseSelectStatus);
  courses = this.store.selectSignal(CourseSelectCourses);

  extendedRecipe = computed(() => {
    let recipes = this.recipes()
      .map((recipe) => ({
        ...recipe,
        course: this.courses().find((course) => course.id === recipe.courseId) ?? null,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (typeof this.activeCourseId() === "number") {
      recipes = recipes.filter((recipe) => recipe.courseId === this.activeCourseId());
    }

    return recipes;
  });

  activeCourseId = signal<Course["id"] | null>(null);

  isLoading = computed(() => {
    const statuses = [this.recipeStatus(), this.courseStatus()];

    return statuses.some((status) => status === "LOADING");
  });

  ngOnInit(): void {
    this.store.dispatch(RecipeActions.fetchAll());
    this.store.dispatch(CourseActions.fetchAll());
  }

  onClickChipCourse(event: MatChipListboxChange) {
    const courseId = event.value as Course["id"];

    if (courseId === undefined) {
      this.activeCourseId.set(null);

      return;
    }

    this.activeCourseId.set(courseId);
  }
}

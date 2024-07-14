import { Component, computed, effect, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { LoadingComponent } from "../../components/loading/loading.component";
import { CourseActions } from "../../states/course/course.action";
import { CourseSelectCourseById, CourseSelectStatus } from "../../states/course/course.reducer";
import { RecipeActions } from "../../states/recipe/recipe.action";
import { RecipeSelectRecipeById, RecipeSelectStatus } from "../../states/recipe/recipe.reducer";

@Component({
  selector: "app-recipe-detail",
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: "./recipe-detail.page.html",
  styleUrl: "./recipe-detail.page.scss",
})
export class RecipeDetailPage {
  activatedRoute = inject(ActivatedRoute);
  store = inject(Store);

  paramRecipeId = Number(this.activatedRoute.snapshot.paramMap.get("id"));

  recipeStatus = this.store.selectSignal(RecipeSelectStatus);
  recipe = this.store.selectSignal(RecipeSelectRecipeById(this.paramRecipeId));

  courseStatus = this.store.selectSignal(CourseSelectStatus);
  course = this.store.selectSignal(CourseSelectCourseById(this.recipe()?.courseId ?? NaN));

  isLoading = computed(() => {
    const statuses = [this.recipeStatus(), this.courseStatus()];

    return statuses.some((status) => status === "LOADING");
  });

  fetchRecipeEffect = effect(
    () => {
      if (this.recipeStatus() === "IDLE" && !this.recipe()) {
        this.store.dispatch(RecipeActions.fetchById({ recipeId: this.paramRecipeId }));
        this.fetchRecipeEffect.destroy();
      }
    },
    { allowSignalWrites: true }
  );

  fetchCourseEffect = effect(
    () => {
      const recipe = this.recipe();

      if (recipe && this.courseStatus() === "IDLE" && !this.course()) {
        this.store.dispatch(CourseActions.fetchById({ courseId: recipe.courseId }));
        this.fetchCourseEffect.destroy();
      }
    },
    { allowSignalWrites: true }
  );
}

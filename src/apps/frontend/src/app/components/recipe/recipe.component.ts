import { Component, inject, input } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { Course } from "../../api/course.api";
import { Recipe } from "../../api/recipe.api";

@Component({
  selector: "app-recipe",
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: "./recipe.component.html",
  styleUrl: "./recipe.component.scss",
})
export class RecipeComponent {
  router = inject(Router);

  recipe = input.required<Recipe>();
  course = input.required<Course>();

  onClickRecipe() {
    this.router.navigateByUrl(`recipes/${this.recipe().id}`);
  }
}

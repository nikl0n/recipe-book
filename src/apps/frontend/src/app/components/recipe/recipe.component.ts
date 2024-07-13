import { Component, input } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
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
  recipe = input.required<Recipe>();
  course = input.required<Course>();
}

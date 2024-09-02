import { Component, input, output } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { ExtendedRecipe } from "../../pages/recipe-list/recipe-list.page";

@Component({
  selector: "app-recipe",
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: "./recipe.component.html",
  styleUrl: "./recipe.component.scss",
})
export class RecipeComponent {
  onClickDeleteRecipe = output<number>();
  onClickEditRecipe = output<number>();
  onClickRecipe = output<number>();

  recipe = input.required<ExtendedRecipe>();
}

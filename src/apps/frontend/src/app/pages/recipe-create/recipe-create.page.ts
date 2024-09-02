import { Component, inject } from "@angular/core";

import { Store } from "@ngrx/store";
import { CreateRecipeExtended } from "../../api/recipe.api";
import { RecipeUpsertComponent } from "../../components/recipe-upsert/recipe-upsert.component";
import { RecipeActions } from "../../states/recipe/recipe.action";

@Component({
  selector: "app-recipe-create",
  standalone: true,
  imports: [RecipeUpsertComponent],
  templateUrl: "./recipe-create.page.html",
  styleUrl: "./recipe-create.page.scss",
})
export class RecipeCreatePage {
  store = inject(Store);

  onCreateRecipe(recipe: CreateRecipeExtended) {
    this.store.dispatch(RecipeActions.create({ recipe }));
  }
}

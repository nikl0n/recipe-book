import { Component, inject } from "@angular/core";

import { Store } from "@ngrx/store";

import { CreateRecipeExtended } from "../../api/recipe.api";
import { BackButtonComponent } from "../../components/back-button/back-button.component";
import { RecipeUpsertComponent } from "../../components/recipe-upsert/recipe-upsert.component";
import { RecipeActions } from "../../states/recipe/recipe.action";
import { UserSelectUser } from "../../states/user/user.reducer";

@Component({
  selector: "app-recipe-create",
  standalone: true,
  imports: [RecipeUpsertComponent, BackButtonComponent],
  templateUrl: "./recipe-create.page.html",
  styleUrl: "./recipe-create.page.scss",
})
export class RecipeCreatePage {
  store = inject(Store);

  user = this.store.selectSignal(UserSelectUser);

  onCreateRecipe(recipe: CreateRecipeExtended) {
    const token = this.user()?.token;
    if (!token) return;

    this.store.dispatch(RecipeActions.create({ recipe, token }));
  }
}

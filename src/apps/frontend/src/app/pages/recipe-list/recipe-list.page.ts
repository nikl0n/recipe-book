import { Component, computed, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { LoadingComponent } from "../../components/loading/loading.component";
import { RecipeComponent } from "../../components/recipe/recipe.component";
import { RecipeActions } from "../../states/recipe/recipe.action";
import { selectRecipes, selectStatus } from "../../states/recipe/recipe.reducer";

@Component({
  selector: "app-recipe-list",
  standalone: true,
  imports: [RecipeComponent, LoadingComponent],
  templateUrl: "./recipe-list.page.html",
  styleUrl: "./recipe-list.page.scss",
})
export class RecipeListPage implements OnInit {
  store = inject(Store);

  recipeStatus = this.store.selectSignal(selectStatus);
  recipes = this.store.selectSignal(selectRecipes);

  isLoading = computed(() => {
    const statuses = [this.recipeStatus()];

    return statuses.some((status) => status === "LOADING");
  });

  ngOnInit(): void {
    this.store.dispatch(RecipeActions.fetchAll());
  }
}

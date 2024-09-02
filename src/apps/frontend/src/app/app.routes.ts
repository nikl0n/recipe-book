import { Routes } from "@angular/router";
import { RecipeCreatePage } from "./pages/recipe-create/recipe-create.page";
import { RecipeDetailPage } from "./pages/recipe-detail/recipe-detail.page";
import { RecipeEditPage } from "./pages/recipe-edit/recipe-edit.page";
import { RecipeListPage } from "./pages/recipe-list/recipe-list.page";

export const routes: Routes = [
  {
    path: "recipes",
    component: RecipeListPage,
  },
  {
    path: "recipes/create",
    component: RecipeCreatePage,
  },
  {
    path: "recipes/:id",
    component: RecipeDetailPage,
  },
  {
    path: "recipes/:id/edit",
    component: RecipeEditPage,
  },

  {
    path: "**",
    redirectTo: "recipes",
    pathMatch: "full",
  },
];

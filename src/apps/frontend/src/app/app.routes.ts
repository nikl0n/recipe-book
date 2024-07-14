import { Routes } from "@angular/router";
import { RecipeDetailPage } from "./pages/recipe-detail/recipe-detail.page";
import { RecipeListPage } from "./pages/recipe-list/recipe-list.page";

export const routes: Routes = [
  {
    path: "recipes",
    component: RecipeListPage,
  },
  {
    path: "recipes/:id",
    component: RecipeDetailPage,
  },
  {
    path: "**",
    redirectTo: "recipes",
    pathMatch: "full",
  },
];

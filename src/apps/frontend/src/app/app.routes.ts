import { Routes } from "@angular/router";
import { RecipeListPage } from "./pages/recipe-list/recipe-list.page";

export const routes: Routes = [
  {
    path: "**",
    component: RecipeListPage,
  },
];

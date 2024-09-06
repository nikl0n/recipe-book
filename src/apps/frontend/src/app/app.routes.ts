import { Routes } from "@angular/router";
import { LoginPage } from "./pages/login/login.page";
import { RecipeCreatePage } from "./pages/recipe-create/recipe-create.page";
import { RecipeDetailPage } from "./pages/recipe-detail/recipe-detail.page";
import { RecipeEditPage } from "./pages/recipe-edit/recipe-edit.page";
import { RecipeListPage } from "./pages/recipe-list/recipe-list.page";
import { RegisterPage } from "./pages/register/register.page";

export const routes: Routes = [
  {
    path: "login",
    component: LoginPage,
  },
  {
    path: "register",
    component: RegisterPage,
  },

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

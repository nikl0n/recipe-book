import { Component } from "@angular/core";
import { RecipeComponent } from "../../components/recipe/recipe.component";

@Component({
  selector: "app-recipe-list",
  standalone: true,
  imports: [RecipeComponent],
  templateUrl: "./recipe-list.page.html",
  styleUrl: "./recipe-list.page.scss",
})
export class RecipeListPage {
  recipes: { name: string; image: string }[] = [
    {
      name: "Spaghetti Bolognese",
      image:
        "https://www.sprinklesandsprouts.com/wp-content/uploads/2019/04/Authentic-Spaghetti-Bolognese-SQ.jpg",
    },
    {
      name: "Spaghetti Carbonara",
      image: "https://www.gutekueche.at/storage/media/recipe/101380/2127_Spaghetti-Carbonara-1.jpg",
    },
  ];
}

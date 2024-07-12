import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";

export type Recipe = {
  id: number;
  name: string;
  image: string;
};

@Injectable({ providedIn: "root" })
export class RecipeApi {
  fetchAllRecipes() {
    const recipe: Recipe[] = [
      {
        id: 0,
        name: "Spaghetti Bolognese",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYns6c9182_yTzj2apb5amdNQE0BKKL4qN_w&s",
      },
      {
        id: 1,
        name: "Spaghetti Carbonara",
        image:
          "https://img.chefkoch-cdn.de/rezepte/1298241234947062/bilder/1509530/crop-960x540/carbonara-wie-bei-der-mamma-in-rom.jpg",
      },
    ];

    return of(recipe).pipe(delay(750));
  }
}

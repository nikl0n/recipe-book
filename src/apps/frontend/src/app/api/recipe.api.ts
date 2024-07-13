import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";

export type Recipe = {
  id: number;
  name: string;
  image: string;
  courseId: number;
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
        courseId: 1,
      },
      {
        id: 1,
        name: "Spaghetti Carbonara",
        image:
          "https://img.chefkoch-cdn.de/rezepte/1298241234947062/bilder/1509530/crop-960x540/carbonara-wie-bei-der-mamma-in-rom.jpg",
        courseId: 1,
      },
      {
        id: 2,
        name: "Lasagne",
        image:
          "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/69EE02DA-213D-44A2-8B08-A590225B221B/Derivates/ddaaebc0-028c-4c3c-b409-281d03dcfe19.jpg",
        courseId: 1,
      },
      {
        id: 3,
        name: "Kartoffelgratin",
        image:
          "https://images.lecker.de/kartoffelgratin-bjpg,id=5dab1742,b=lecker,w=1600,rm=sk.webp",
        courseId: 1,
      },
    ];

    return of(recipe).pipe(delay(750));
  }
}

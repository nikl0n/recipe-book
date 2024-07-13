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
      {
        id: 4,
        name: "Bruschetta",
        image: "https://www.koch-mit.de/app/uploads/2019/02/AdobeStock_62743914.jpeg",
        courseId: 0,
      },
      {
        id: 5,
        name: "Tiramisu",
        image:
          "https://img.chefkoch-cdn.de/rezepte/264171102553424/bilder/1518856/crop-960x540/tiramisu.jpg",
        courseId: 2,
      },
      {
        id: 6,
        name: "Spinat Hackfleischauflauf",
        image:
          "https://img.chefkoch-cdn.de/rezepte/304951110762739/bilder/174512/crop-642x428/spinat-hackfleisch-auflauf.jpg",
        courseId: 1,
      },
      {
        id: 6,
        name: "Wraps",
        image:
          "https://recipesblob.oetker.de/assets/a20751e430934ecb9ca35ce22164efd2/1920x1153/vegane-wraps-mit-avocado-minzecreme-quer1-ausschnitt.webp",
        courseId: 1,
      },
      {
        id: 7,
        name: "Tacos",
        image:
          "https://images.ctfassets.net/hg3j0azooxs3/2jIP5VsxxzLQtZ0jw7GgRV/31324ce94e8d6caa8bee926b440bf4b5/050823_Recipe_B009_Bolognese-Tacos_3x4_Galery1.jpg",
        courseId: 1,
      },
      {
        id: 8,
        name: "Burger",
        image: "https://www.motioncooking.com/wp-content/uploads/2021/11/DSC05650.jpg",
        courseId: 1,
      },
      {
        id: 9,
        name: "Kartoffelwedges",
        image: "https://www.gaumenfreundin.de/wp-content/uploads/2022/09/Kartoffel-Wedges.jpg",
        courseId: 3,
      },
      {
        id: 10,
        name: "Gefüllte Paprika",
        image:
          "https://emmikochteinfach.de/wp-content/uploads/2022/01/SEO-Gefuellte-Paprika-mit-Hackfleisch-5.jpg",
        courseId: 1,
      },
      {
        id: 11,
        name: "Pizzateig",
        image:
          "https://www.einfachbacken.de/sites/einfachbacken.de/files/styles/full_width_tablet_4_3/public/2019-02/pizzateig-grundrezept.jpg?h=a1e1a043&itok=k_CqDTme",
        courseId: 1,
      },
      {
        id: 12,
        name: "Menemen",
        image: "https://www.bulgurkitchen.de/wp-content/uploads/2023/11/menemen-in-der-pfanne.jpg",
        courseId: 0,
      },
      {
        id: 13,
        name: "Nachos",
        image:
          "https://img.taste.com.au/eAW0Y3k4/taste/2016/11/vegetarian-nachos-with-guacamole-86796-1.jpeg",
        courseId: 4,
      },
      {
        id: 14,
        name: "Spaghetti Pomodoro",
        image:
          "https://fitaliancook.com/wp-content/uploads/2023/08/spaghetti-pomodoro-beitragsbild.jpg",
        courseId: 1,
      },
      {
        id: 15,
        name: "Tortellini",
        image:
          "https://www.spicebar.de/media/cache/resized//uploads/rezepte/rezepte64-image-990x557.jpg",
        courseId: 1,
      },
      {
        id: 16,
        name: "Nudelauflauf",
        image:
          "https://www.cuisini-blog.de/wp-content/uploads/2023/06/einfacher-nudelauflauf-mit-schinken-und-kaese-1.jpg",
        courseId: 1,
      },
    ];

    return of(recipe).pipe(delay(750));
  }
}

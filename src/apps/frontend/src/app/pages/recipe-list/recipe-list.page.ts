import { CommonModule } from "@angular/common";
import { Component, computed, effect, inject, signal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

import { ReadCategory, ReadRecipe } from "@packages/types";

import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatChipListboxChange, MatChipsModule } from "@angular/material/chips";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Store } from "@ngrx/store";
import { take } from "rxjs";

import { environment } from "../../../environment/environment";
import { DialogAreYouSureComponent } from "../../components/dialog-are-you-sure/dialog-are-you-sure.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { RecipeComponent } from "../../components/recipe/recipe.component";
import { CategorySelectCategories } from "../../states/category/category.reducer";
import { RecipeActions } from "../../states/recipe/recipe.action";
import {
  RecipeSelectLastFetched,
  RecipeSelectRecipes,
  RecipeSelectStatus,
} from "../../states/recipe/recipe.reducer";
import { UserActions } from "../../states/user/user.action";
import { UserSelectUser } from "../../states/user/user.reducer";

export type ExtendedRecipe = ReadRecipe & {
  category: ReadCategory | undefined;
  image: string;
};

@Component({
  selector: "app-recipe-list",
  standalone: true,
  imports: [
    CommonModule,

    MatChipsModule,
    MatButtonModule,
    MatIconModule,

    RecipeComponent,
    LoadingComponent,
  ],
  templateUrl: "./recipe-list.page.html",
  styleUrl: "./recipe-list.page.scss",
})
export class RecipeListPage {
  store = inject(Store);
  router = inject(Router);
  dialog = inject(MatDialog);
  bottomSheet = inject(MatBottomSheet);

  user = this.store.selectSignal(UserSelectUser);

  recipeStatus = this.store.selectSignal(RecipeSelectStatus);
  recipes = this.store.selectSignal(RecipeSelectRecipes);
  recipeLastFetched = this.store.selectSignal(RecipeSelectLastFetched);

  categories = this.store.selectSignal(CategorySelectCategories);

  activeCategoryIds = signal<ReadCategory["id"][]>([]);

  extendedRecipe = computed(() => {
    let recipes: ExtendedRecipe[] = this.recipes()
      .map((recipe) => ({
        ...recipe,
        category: this.categories().find((category) => category.id === recipe.categoryId),
        image: `${environment.api.baseUrl}/api/v1/recipes/${recipe.id}/image`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (this.activeCategoryIds().length > 0) {
      recipes = recipes.filter((recipe) => this.activeCategoryIds().includes(recipe.categoryId));
    }

    return recipes;
  });

  isLoading = computed(() => {
    return [this.recipeStatus()].some((status) => status === "LOADING");
  });

  fetchResources = effect(
    () => {
      if (this.recipeLastFetched() !== "recipe-list") {
        this.store.dispatch(RecipeActions.fetchAll());
        this.store.dispatch(RecipeActions.setLastFetched({ componentName: "recipe-list" }));
      }
    },
    { allowSignalWrites: true }
  );

  onClickChipCategory(event: MatChipListboxChange) {
    const categoryIds = event.value as Array<ReadCategory["id"]>;

    this.activeCategoryIds.set(categoryIds);
  }

  onClickRecipe(id: number) {
    this.router.navigateByUrl(`recipes/${id}`);
  }

  onClickEditRecipe(id: number) {
    this.router.navigateByUrl(`recipes/${id}/edit`);
  }

  onClickDeleteRecipe(recipeId: number) {
    const token = this.user()?.token;
    if (!token) return;

    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      data: "Möchtest du das Rezept wirklich löschen?",
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: boolean) => {
        if (!result) return;

        this.store.dispatch(RecipeActions.delete({ recipeId, token }));
      });
  }

  onClickCreateRecipe() {
    this.router.navigateByUrl(`recipes/create`);
  }

  onClickMenu() {
    this.bottomSheet.open(RecipeListMenuComponent);
  }
}

@Component({
  template: ` <mat-nav-list>
    @if (user()) {
      <a mat-list-item (click)="logout($event)">
        <span matListItemTitle>Abmelden</span>
      </a>
    } @else {
      <a routerLink="/login" mat-list-item (click)="openLink($event)">
        <span matListItemTitle>Anmelden</span>
      </a>

      <a routerLink="/register" mat-list-item (click)="openLink($event)">
        <span matListItemTitle>Registrieren</span>
      </a>
    }
  </mat-nav-list>`,
  standalone: true,
  imports: [MatListModule, RouterModule],
})
export class RecipeListMenuComponent {
  bottomSheetRef = inject<MatBottomSheetRef<RecipeListMenuComponent>>(MatBottomSheetRef);

  store = inject(Store);
  snackBar = inject(MatSnackBar);

  user = this.store.selectSignal(UserSelectUser);

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();

    event.preventDefault();
  }

  logout(event: MouseEvent) {
    this.bottomSheetRef.dismiss();

    localStorage.removeItem("user");
    this.store.dispatch(UserActions.deleteUser());

    this.snackBar.open("Erfolgreich abgemeldet", "Ok", { duration: 5000 });

    event.preventDefault();
  }
}

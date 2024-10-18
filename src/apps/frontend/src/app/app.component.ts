import { CommonModule } from "@angular/common";
import { Component, computed, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { ReadUser } from "@repo/types";

import { Store } from "@ngrx/store";

import { LoadingComponent } from "./components/loading/loading.component";
import { GlobalCategoryActions } from "./states/category/category.action";
import { CategorySelectStatus } from "./states/category/category.reducer";
import { GlobalUnitActions } from "./states/unit/unit.action";
import { UnitSelectStatus } from "./states/unit/unit.reducer";
import { UserActions } from "./states/user/user.action";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoadingComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  store = inject(Store);

  categoryStatus = this.store.selectSignal(CategorySelectStatus);
  unitStatus = this.store.selectSignal(UnitSelectStatus);

  isLoading = computed(() => {
    return [this.categoryStatus(), this.unitStatus()].some((status) => status === "LOADING");
  });

  ngOnInit() {
    this.store.dispatch(GlobalCategoryActions.fetchAll());
    this.store.dispatch(GlobalUnitActions.fetchAll());

    const localStorageUser = localStorage.getItem("user");
    if (!localStorageUser) return;

    try {
      const user = JSON.parse(localStorageUser) as ReadUser;

      this.store.dispatch(UserActions.setUser({ user }));
    } catch (_) {}
  }
}

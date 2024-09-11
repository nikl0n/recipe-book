import { Component, inject, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";

@Component({
  selector: "app-back-button",
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: "./back-button.component.html",
  styleUrl: "./back-button.component.scss",
})
export class BackButtonComponent {
  router = inject(Router);

  link = input.required<string>();

  onClickBackButton() {
    this.router.navigateByUrl(this.link());
  }
}

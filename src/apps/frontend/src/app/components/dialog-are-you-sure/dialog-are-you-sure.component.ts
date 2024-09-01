import { Component, inject } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";

@Component({
  selector: "app-dialog-are-you-sure",
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: "./dialog-are-you-sure.component.html",
  styleUrl: "./dialog-are-you-sure.component.scss",
})
export class DialogAreYouSureComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAreYouSureComponent>);
  readonly data = inject<string>(MAT_DIALOG_DATA);
}

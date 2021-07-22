import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { KoalaSnackbarInterface } from "./koala.snackbar.interface";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";

@Component({
  templateUrl: 'koala.snackbar.component.html',
  styleUrls: ['koala.snackbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KoalaSnackbarComponent {
  constructor(
    public snackbarRef: MatSnackBarRef<KoalaSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: KoalaSnackbarInterface) {
  }
}

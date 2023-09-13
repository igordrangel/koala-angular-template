import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { KoalaSnackbarInterface } from "./koala.snackbar.interface";
import { MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA, MatLegacySnackBarRef as MatSnackBarRef } from "@angular/material/legacy-snack-bar";

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

import { Injectable } from "@angular/core";
import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar";
import { KoalaSnackbarComponent } from "./koala.snackbar.component";

@Injectable()
export class KoalaSnackbarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public success(message?: string) {
    this.showSnackBar(message, 'check_circle', 'success');
  }

  public warning(message?: string) {
    this.showSnackBar(message, 'warning', 'warning');
  }

  public error(message?: string) {
    this.showSnackBar(message, 'error', 'error');
  }

  private showSnackBar(message?: string, icon?: string, panelClass?: string) {
    this.snackBar.openFromComponent(KoalaSnackbarComponent, {
      data: {
        message,
        icon
      },
      panelClass: panelClass ? [panelClass] : [],
      horizontalPosition: "left",
      duration: 10000
    });
  }
}

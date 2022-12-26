import { NgModule } from "@angular/core";
import { KoalaSnackbarComponent } from "./koala.snackbar.component";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacySnackBarModule as MatSnackBarModule } from "@angular/material/legacy-snack-bar";
import { KoalaSnackbarService } from "./koala.snackbar.service";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";

@NgModule({
  declarations: [
    KoalaSnackbarComponent
  ],
  exports: [
    KoalaSnackbarComponent,
    MatSnackBarModule
  ],
  imports: [
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [KoalaSnackbarService]
})
export class KoalaSnackbarModule {}

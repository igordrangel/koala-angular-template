import { NgModule } from "@angular/core";
import { KoalaSnackbarComponent } from "./koala.snackbar.component";
import { MatIconModule } from "@angular/material/icon";
import { KoalaSnackbarService } from "./koala.snackbar.service";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";

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

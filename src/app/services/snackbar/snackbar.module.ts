import { NgModule } from "@angular/core";
import { PageSnackbarComponent } from "./page-snackbar.component";
import { CommonModule } from "@angular/common";
import { SnackbarRoutingModule } from "./snackbar.routing.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { KoalaButtonModule } from "@koalarx/ui/button";
import { KoalaSnackbarModule } from "@koalarx/ui/snackbar";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";

@NgModule({
  declarations: [
    PageSnackbarComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaSnackbarModule,
    KoalaButtonModule,
    MatExpansionModule,
    MatIconModule,
    SnackbarRoutingModule
  ]
})
export class SnackbarModule {}

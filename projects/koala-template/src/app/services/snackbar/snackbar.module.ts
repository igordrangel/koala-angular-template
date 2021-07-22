import { NgModule } from "@angular/core";
import { PageSnackbarComponent } from "./page-snackbar.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { KoalaSnackbarModule } from "../../../../../ngx-koala/src/lib/shared/components/snackbar/koala.snackbar.module";
import { SnackbarRoutingModule } from "./snackbar.routing.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/lib/shared/components/button/koala.button.module";

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

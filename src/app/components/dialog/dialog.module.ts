import { NgModule } from "@angular/core";
import { DialogExample, PageDialogComponent } from "./page-dialog.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
import { DialogRoutingModule } from "./dialog.routing.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { KoalaButtonModule } from "@koalarx/ui/button";
import { KoalaDialogModule } from "@koalarx/ui/dialog";
import { MatLegacyTabsModule as MatTabsModule } from "@angular/material/legacy-tabs";

@NgModule({
  exports: [
    PageDialogComponent
  ],
  declarations: [
    PageDialogComponent,
    DialogExample
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaDialogModule,
    KoalaButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    DialogRoutingModule
  ]
})
export class DialogModule {}

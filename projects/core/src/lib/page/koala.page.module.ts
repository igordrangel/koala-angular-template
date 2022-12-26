import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageComponent } from "./page.component";
import { NotificationComponent } from "./notifications/notification.component";
import { LoaderBarPageComponent } from "../loader/loader-bar-page.component";
import { MatBadgeModule } from "@angular/material/badge";
import { MatLegacyProgressBarModule as MatProgressBarModule } from "@angular/material/legacy-progress-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from "@angular/material/legacy-progress-spinner";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    PageComponent,
    NotificationComponent,
    LoaderBarPageComponent
  ],
  exports: [
    PageComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
  ]
})
export class KoalaPageModule {}

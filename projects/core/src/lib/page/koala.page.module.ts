import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageComponent } from "./page.component";
import { NotificationComponent } from "./notifications/notification.component";
import { LoaderBarPageComponent } from "../loader/loader-bar-page.component";
import { MatBadgeModule } from "@angular/material/badge";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatListModule } from "@angular/material/list";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";

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

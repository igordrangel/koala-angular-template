import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageComponent } from "./page.component";
import { NotificationComponent } from "./notifications/notification.component";
import { LoaderBarPageComponent } from "../loader/loader-bar-page.component";
import { MatBadgeModule } from "@angular/material/badge";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
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

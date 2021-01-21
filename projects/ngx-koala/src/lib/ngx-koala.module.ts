import { NgModule } from '@angular/core';
import { KoalaFormModule } from './shared/components/form/koala.form.module';
import { PageComponent } from './shared/components/page/page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoaderBarPageComponent } from './shared/components/loader/loader-bar-page.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationComponent } from './shared/components/notifications/notification.component';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OAuthModule } from "angular-oauth2-oidc";

@NgModule({
  declarations: [
    PageComponent,
    NotificationComponent,
    LoaderBarPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    KoalaFormModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    OAuthModule.forRoot(),
  ],
  exports: [
    PageComponent,
    HttpClientModule,
    KoalaFormModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    OAuthModule
  ]
})
export class NgxKoalaModule {
}

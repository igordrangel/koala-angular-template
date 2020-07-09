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

@NgModule({
  declarations: [
    PageComponent,
    LoaderBarPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    KoalaFormModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
  ],
  exports: [
    PageComponent,
    HttpClientModule,
    KoalaFormModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class NgxKoalaModule {
}

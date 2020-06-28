import { NgModule } from '@angular/core';
import { KoalaFormModule } from './shared/components/form/koala.form.module';
import { PageComponent } from './shared/components/page/page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    KoalaFormModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    PageComponent,
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

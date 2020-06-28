import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KoalaFormModule } from '../../../ngx-koala/src/lib/shared/components/form/koala.form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxKoalaModule } from '../../../ngx-koala/src/lib/ngx-koala.module';
import { PageLoginComponent } from './login/page-login.component';

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxKoalaModule,
    KoalaFormModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

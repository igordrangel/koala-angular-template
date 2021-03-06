import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KoalaFormModule } from '../../../ngx-koala/src/lib/shared/components/form/koala.form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxKoalaModule } from '../../../ngx-koala/src/lib/ngx-koala.module';
import { PageLoginComponent } from './login/page-login.component';
import { KoalaMenuModule } from '../../../ngx-koala/src/lib/shared/components/menu/koala.menu.module';
import { QuestionAvatarModule } from './shared/components/question-avatar/question-avatar.module';
import { PageGetStartedComponent } from "./get-started/page-get-started.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { KoalaIconModule } from "../../../ngx-koala/src/lib/shared/components/icon/koala.icon.module";
import { KoalaButtonModule } from "../../../ngx-koala/src/lib/shared/components/button/koala.button.module";
import { registerLocaleData } from "@angular/common";
import ptBr from '@angular/common/locales/pt';
import { KoalaOAuth2Service } from "../../../ngx-koala/src/lib/shared/services/openid/koala.oauth2.service";

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    PageGetStartedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxKoalaModule,
    KoalaFormModule,
    KoalaMenuModule,
    KoalaButtonModule,
    KoalaIconModule,
    MatExpansionModule,
    QuestionAvatarModule,
    AppRoutingModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    KoalaOAuth2Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

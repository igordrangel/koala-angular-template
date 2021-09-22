import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KoalaFormModule } from '../../../ngx-koala/src/form';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxKoalaModule } from '@koalarx/ui/core';
import { PageLoginComponent } from './login/page-login.component';
import { KoalaMenuModule } from '../../../ngx-koala/src/menu';
import { QuestionAvatarModule } from './shared/components/question-avatar/question-avatar.module';
import { PageGetStartedComponent } from "./get-started/page-get-started.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { KoalaIconModule } from "../../../ngx-koala/src/icon";
import { KoalaButtonModule } from "../../../ngx-koala/src/button";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    PageGetStartedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxKoalaModule.forRoot(environment),
    KoalaFormModule,
    KoalaMenuModule,
    KoalaButtonModule,
    KoalaIconModule,
    MatExpansionModule,
    QuestionAvatarModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

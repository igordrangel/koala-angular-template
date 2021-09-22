import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxKoalaModule } from '@koalarx/ui/core';
import { PageLoginComponent } from './login/page-login.component';
import { QuestionAvatarModule } from './shared/components/question-avatar/question-avatar.module';
import { PageGetStartedComponent } from "./get-started/page-get-started.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { environment } from "../environments/environment";
import { KoalaFormModule } from "@koalarx/ui/form";
import { KoalaButtonModule } from "@koalarx/ui/button";
import { KoalaIconModule } from "@koalarx/ui/icon";
import { KoalaMenuModule } from "@koalarx/ui/menu";

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

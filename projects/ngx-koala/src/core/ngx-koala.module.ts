import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KoalaOAuth2Service } from "./services/openid/koala.oauth2.service";
import { KoalaEnvironment, KoalaEnvironmentInterface } from "./environments/koalaEnvironment";
import { KoalaPageModule } from "./page/koala.page.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    KoalaPageModule
  ],
  exports: [
    HttpClientModule,
    KoalaPageModule
  ],
  providers: [
    KoalaOAuth2Service
  ]
})
export class NgxKoalaModule {
  static forRoot(environment: KoalaEnvironmentInterface): ModuleWithProviders<NgxKoalaModule> {
    environment.storageOAuthTypeName = environment.storageOAuthTypeName ?? 'koala_ui_oauth_type';
    environment.storageTokenName = environment.storageTokenName ?? 'koala_ui_token';

    KoalaEnvironment.environment = environment;

    return {
      ngModule: NgxKoalaModule,
      providers: [KoalaOAuth2Service]
    };
  }
}

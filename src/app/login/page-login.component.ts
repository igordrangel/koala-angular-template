import * as jwtEncode from 'jwt-encode';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KoalaOAuth2Service, KoalaTokenService } from "@koalarx/ui/core";
import { FormAbstract, KoalaDynamicFormConfigInterface, KoalaDynamicFormService } from "@koalarx/ui/form";

@Component({
  templateUrl: 'page-login.component.html',
  styleUrls: ['page-login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLoginComponent extends FormAbstract {
  public config: KoalaDynamicFormConfigInterface;
  public btnLabel = 'Login';

  constructor(
    public oauthService: KoalaOAuth2Service,
    private tokenService: KoalaTokenService,
    private dynamicFormService: KoalaDynamicFormService
  ) {
    super(() => this.config.form);
    this.config = dynamicFormService
      .build()
      .field('Username', 'username', "text").appearance("outline", "auto").textHint('Inform a fake username.').focus().required().generate()
      .field('Password', 'password', "password").appearance("outline", "auto").textHint('Inform a fake password.').required().generate()
      .autofill({
        username: 'demo',
        password: '123'
      })
      .generate();
  }

  public submit() {
    this.loading(true, 'Validating...');
    const data = this.dynamicFormService.emitData(this.config.form) as any;
    setTimeout(() => {
      this.tokenService.setToken(jwtEncode({
        id: 1,
        login: data.username
      }, 'secret'));
      this.loading(false, 'Login');
    }, 2000);
  }
}

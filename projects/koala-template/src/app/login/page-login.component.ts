import * as jwtEncode from 'jwt-encode';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormAbstract } from '../../../../ngx-koala/src/lib/core/form.abstract';
import { KoalaTokenService } from '../../../../ngx-koala/src/lib/shared/services/token/koala.token.service';
import { KoalaDynamicFormService } from '../../../../ngx-koala/src/lib/shared/services/dynamic-forms/koala.dynamic-form.service';
import { OAuthService } from "angular-oauth2-oidc";
import { KoalaDynamicFormConfigInterface } from "../../../../ngx-koala/src/lib/shared/services/dynamic-forms/builder/koala.dynamic-form-config.interface";

@Component({
  templateUrl: 'page-login.component.html',
  styleUrls: ['page-login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLoginComponent extends FormAbstract {
  public config: KoalaDynamicFormConfigInterface;
  public btnLabel = 'Login';

  constructor(
    public oauthService: OAuthService,
    private tokenService: KoalaTokenService,
    private dynamicFormService: KoalaDynamicFormService
  ) {
    super(() => this.config.form);
    this.config = dynamicFormService
      .build()
        .field('Username', 'username', "text")
          .appearance("outline", "auto")
          .textHint('Inform a fake username.')
          .focus()
          .required()
        .generate()
        .field('Password', 'password', "password")
          .appearance("outline", "auto")
          .textHint('Inform a fake password.')
          .required()
        .generate()
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

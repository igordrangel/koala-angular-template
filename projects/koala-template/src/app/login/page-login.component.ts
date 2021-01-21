import * as jwtEncode from 'jwt-encode';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KoalaDynamicFormFieldInterface } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/koala.dynamic-form-field.interface';
import { DynamicFormTypeFieldEnum } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum';
import { FormAbstract } from '../../../../ngx-koala/src/lib/core/form.abstract';
import { KoalaTokenService } from '../../../../ngx-koala/src/lib/shared/services/token/koala.token.service';
import { KoalaDynamicFormService } from '../../../../ngx-koala/src/lib/shared/services/dynamic-forms/koala.dynamic-form.service';
import { OAuthService } from "angular-oauth2-oidc";

@Component({
  templateUrl: 'page-login.component.html',
  styleUrls: ['page-login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLoginComponent extends FormAbstract implements OnInit {
  public formLogin: FormGroup;
  public formConfig: KoalaDynamicFormFieldInterface[];
  public btnLabel = 'Login';

  constructor(
    public oauthService: OAuthService,
    private fb: FormBuilder,
    private tokenService: KoalaTokenService,
    private dynamicFormService: KoalaDynamicFormService
  ) {
    super(() => this.formLogin);
  }

  ngOnInit() {
    this.formLogin = this.fb.group({});
    this.formConfig = [
      {
        label: 'Username',
        name: 'username',
        type: DynamicFormTypeFieldEnum.text,
        required: true,
        appearance: 'outline',
        fieldClass: 'w-100',
        focus: true,
        textHint: 'Inform a fake username.'
      },
      {
        label: 'Password',
        name: 'password',
        type: DynamicFormTypeFieldEnum.password,
        required: true,
        appearance: 'outline',
        fieldClass: 'w-100',
        textHint: 'Inform a fake password.'
      }
    ];
  }

  public submit() {
    this.loading(true, 'Validating...');
    const data = this.dynamicFormService.emitData(this.formLogin) as any;
    setTimeout(() => {
      this.tokenService.setToken(jwtEncode({
        id: 1,
        login: data.username
      }, 'secret'));
      this.loading(false, 'Login');
    }, 2000);
  }
}

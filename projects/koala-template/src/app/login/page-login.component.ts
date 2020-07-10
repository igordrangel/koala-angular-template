import * as jwtEncode from 'jwt-encode';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/dynamic-form-field.interface';
import { DynamicFormTypeFieldEnum } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum';
import { FormAbstract } from '../../../../ngx-koala/src/lib/core/form.abstract';
import { KoalaTokenService } from '../../../../ngx-koala/src/lib/shared/services/token/koala.token.service';
import { KoalaDynamicFormService } from '../../../../ngx-koala/src/lib/shared/services/dynamic-forms/koala.dynamic-form.service';

@Component({
  templateUrl: 'page-login.component.html',
  styleUrls: ['page-login.component.css']
})
export class PageLoginComponent extends FormAbstract implements OnInit {
  public formLogin: FormGroup;
  public formConfig: DynamicFormFieldInterface[];
  public btnLabel = 'Entrar';

  constructor(
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
        label: 'Login',
        name: 'login',
        type: DynamicFormTypeFieldEnum.text,
        required: true,
        appearance: 'outline',
        fieldClass: 'w-100'
      },
      {
        label: 'Senha',
        name: 'senha',
        type: DynamicFormTypeFieldEnum.password,
        required: true,
        appearance: 'outline',
        fieldClass: 'w-100'
      }
    ];
  }

  public submit() {
    this.loading(true, 'Autenticando...');
    const data = this.dynamicFormService.emitData(this.formLogin) as any;
    setTimeout(() => {
      this.tokenService.setToken(jwtEncode({
        id: 1,
        login: data.login
      }, 'secret'));
      this.loading(false, 'Entrar');
    }, 2000);
  }
}

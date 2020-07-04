import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/dynamic-form-field.interface';
import { DynamicFormTypeFieldEnum } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum';
import { FormAbstract } from '../../../../ngx-koala/src/lib/core/form.abstract';
import { TokenService } from '../../../../ngx-koala/src/lib/shared/components/token/token.service';
import * as jwtEncode from 'jwt-encode';

@Component({
  templateUrl: 'page-login.component.html',
  styleUrls: ['page-login.component.css']
})
export class PageLoginComponent extends FormAbstract {
  public formTest: FormGroup;
  public formConfig: DynamicFormFieldInterface[];
  public btnLabel = 'Entrar';

  constructor(
    private tokenService: TokenService
  ) {
    super(() => this.formTest);
    this.formConfig = [
      {label: 'Login', name: 'login', type: DynamicFormTypeFieldEnum.text, required: true},
      {label: 'Senha', name: 'senha', type: DynamicFormTypeFieldEnum.password, required: true}
    ];
  }

  public submit(data: any) {
    this.loading(true, 'Autenticando...');
    setTimeout(() => {
      this.tokenService.setToken(jwtEncode({
        id: 1,
        login: data.login
      }, 'secret'));
      this.loading(false, 'Entrar');
    }, 2000);
  }
}

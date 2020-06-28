import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/dynamic-form-field.interface';
import { DynamicFormTypeFieldEnum } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum';
import { FormAbstract } from '../../../../ngx-koala/src/lib/core/form.abstract';

@Component({
  templateUrl: 'page-login.component.html',
  styleUrls: ['page-login.component.css']
})
export class PageLoginComponent extends FormAbstract {
  public formTest: FormGroup;
  public formConfig: DynamicFormFieldInterface[];
  public btnLabel = 'Entrar';

  constructor() {
    super(() => this.formTest);
    this.formConfig = [
      {label: 'Login', name: 'login', type: DynamicFormTypeFieldEnum.text, required: true},
      {label: 'Senha', name: 'senha', type: DynamicFormTypeFieldEnum.password, required: true}
    ];
  }

  public submit(data: any) {
    this.loading(true, 'Autenticando...');
    setTimeout(() => {
      this.loading(false, 'Entrar');
      console.log(data);
    }, 2000);
  }
}

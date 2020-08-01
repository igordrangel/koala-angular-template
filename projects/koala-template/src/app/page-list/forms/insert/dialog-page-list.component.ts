import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KoalaDynamicFormFieldInterface } from '../../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/koala.dynamic-form-field.interface';
import { FormAbstract } from '../../../../../../ngx-koala/src/lib/core/form.abstract';
import { DynamicFormTypeFieldEnum } from '../../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum';
import { KoalaDynamicFormService } from '../../../../../../ngx-koala/src/lib/shared/services/dynamic-forms/koala.dynamic-form.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountriesInterface } from '../../countries.interface';

@Component({
  templateUrl: 'dialog-page-list.component.html'
})
export class DialogPageListComponent extends FormAbstract implements OnInit {
  public formInsert: FormGroup;
  public formConfig: KoalaDynamicFormFieldInterface[];

  constructor(
    private fb: FormBuilder,
    private dynamicFormService: KoalaDynamicFormService,
    private dialogRef: MatDialogRef<DialogPageListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CountriesInterface
  ) {
    super(() => this.formInsert);
  }

  ngOnInit() {
    this.formInsert = this.fb.group({});
    this.formConfig = [
      {
        label: 'Name',
        name: 'name',
        type: DynamicFormTypeFieldEnum.text,
        required: true,
        appearance: 'outline',
        floatLabel: 'always',
        fieldClass: 'col-12',
        value: this.data?.name ?? ''
      },
      {
        label: 'Capital',
        name: 'capital',
        type: DynamicFormTypeFieldEnum.text,
        required: true,
        appearance: 'outline',
        floatLabel: 'always',
        fieldClass: 'col-12',
        value: this.data?.capital ?? ''
      },
      {
        label: 'Region',
        name: 'region',
        type: DynamicFormTypeFieldEnum.text,
        required: true,
        appearance: 'outline',
        floatLabel: 'always',
        fieldClass: 'col-12',
        value: this.data?.region ?? ''
      }
    ];
  }

  public enviar() {
    this.loading(true);
    setTimeout(() => {
      console.log(this.dynamicFormService.emitData(this.formInsert));
      this.loading(false);
      this.dialogRef.close('reloadList');
    }, 2000);
  }
}

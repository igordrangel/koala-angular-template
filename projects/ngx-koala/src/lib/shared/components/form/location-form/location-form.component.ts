import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KoalaDynamicFormFieldInterface } from '../dynamic-form/interfaces/koala.dynamic-form-field.interface';
import { DynamicFormTypeFieldEnum } from '../dynamic-form/enums/dynamic-form-type-field.enum';
import { ViacepService } from '../../../services/viacep/viacep.service';
import { ViacepInterface } from '../../../services/viacep/viacep.interface';

@Component({
  selector: 'koala-location-form',
  templateUrl: 'location-form.component.html'
})
export class LocationFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  public formLocationConfig: KoalaDynamicFormFieldInterface[];
  private localization: ViacepInterface;
  
  constructor(
    private fb: FormBuilder,
    private viacepService: ViacepService
  ) {}
  
  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.fb.group({});
    }
    this.formLocationConfig = [
      {
        label: 'Cep',
        name: 'cep',
        fieldClass: 'col-3',
        type: DynamicFormTypeFieldEnum.text,
        appearance: 'outline',
        floatLabel: 'always',
        required: true,
        valueChanges: async (value: string) => {
          if (value && value.length >= 8) {
            const cep = Number(value.replace(/^0-9/g, ''));
            this.viacepService.get(cep).subscribe(localization => this.localization = localization);
          }
        }
      },
      {
        label: 'Cidade',
        name: 'cidade',
        fieldClass: 'col-3',
        type: DynamicFormTypeFieldEnum.text,
        appearance: 'outline',
        floatLabel: 'always',
        required: true,
        value: this.localization?.localidade
      }
    ];
  }
}

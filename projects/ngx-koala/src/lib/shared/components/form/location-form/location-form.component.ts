import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KoalaDynamicFormFieldInterface } from '../dynamic-form/interfaces/koala.dynamic-form-field.interface';
import { DynamicFormTypeFieldEnum } from '../dynamic-form/enums/dynamic-form-type-field.enum';
import { ViacepService } from '../../../services/viacep/viacep.service';
import { ViacepInterface } from '../../../services/viacep/viacep.interface';
import { BehaviorSubject } from 'rxjs';
import { KoalaDynamicSetValueInterface } from '../dynamic-form/interfaces/koala.dynamic-set-value.interface';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'koala-location-form',
  templateUrl: 'location-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() appereance: MatFormFieldAppearance = 'fill';
  @Input() floatLabel: FloatLabelType = 'always';
  public formLocationConfig: KoalaDynamicFormFieldInterface[];
  public locationSubject: BehaviorSubject<KoalaDynamicSetValueInterface[]> = new BehaviorSubject<KoalaDynamicSetValueInterface[]>(null);

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
        class: 'w-100',
        fieldClass: 'w-50',
        type: DynamicFormTypeFieldEnum.text,
        appearance: this.appereance,
        floatLabel: this.floatLabel,
        required: true,
        textHint: 'Informe o CEP para preenchimento automático',
        valueChanges: async (value: string) => {
          if (value && value.length >= 8) {
            const cep = Number(value.replace(/^0-9/g, ''));
            this.viacepService.get(cep).subscribe(location => this.setLocation(location));
          }
        }
      },
      {
        label: 'Estado',
        name: 'estado',
        class: 'col-2',
        fieldClass: 'w-100',
        type: DynamicFormTypeFieldEnum.text,
        appearance: this.appereance,
        floatLabel: this.floatLabel,
        required: true
      },
      {
        label: 'Cidade',
        name: 'cidade',
        class: 'col-5',
        fieldClass: 'w-100',
        type: DynamicFormTypeFieldEnum.text,
        appearance: this.appereance,
        floatLabel: this.floatLabel,
        required: true
      },
      {
        label: 'Bairro',
        name: 'bairro',
        class: 'col-5',
        fieldClass: 'w-100',
        type: DynamicFormTypeFieldEnum.text,
        appearance: this.appereance,
        floatLabel: this.floatLabel,
        required: true
      },
      {
        label: 'Endereço',
        name: 'endereco',
        class: 'col-5',
        fieldClass: 'w-100',
        type: DynamicFormTypeFieldEnum.text,
        appearance: this.appereance,
        floatLabel: this.floatLabel,
        required: true
      },
      {
        label: 'Complemento',
        name: 'complemento',
        class: 'col-5',
        fieldClass: 'w-100',
        type: DynamicFormTypeFieldEnum.text,
        appearance: this.appereance,
        floatLabel: this.floatLabel
      },
      {
        label: 'Número',
        name: 'numero',
        class: 'col-2',
        fieldClass: 'w-100',
        type: DynamicFormTypeFieldEnum.text,
        appearance: this.appereance,
        floatLabel: this.floatLabel
      }
    ];
  }
  
  private setLocation(location: ViacepInterface) {
    this.locationSubject.next([
      {name: 'cidade', value: location.localidade},
      {name: 'estado', value: location.uf},
      {name: 'bairro', value: location.bairro},
      {name: 'endereco', value: location.logradouro},
      {name: 'complemento', value: location.complemento},
      {name: 'numero', value: location.unidade}
    ]);
  }
}

import { Component, OnInit } from "@angular/core";
import { NavigateHelper } from "../../shared/helpers/navigate.helper";
import { FormAbstract } from "../../../../../ngx-koala/src/lib/core/form.abstract";
import { FormBuilder, FormGroup } from "@angular/forms";
import { KoalaDynamicFormFieldInterface } from "../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/koala.dynamic-form-field.interface";
import { KoalaDynamicFormService } from "../../../../../ngx-koala/src/lib/shared/services/dynamic-forms/koala.dynamic-form.service";
import { DynamicFormTypeFieldEnum } from "../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { BehaviorSubject } from "rxjs";
import { KoalaDynamicFormShowFieldInterface } from "../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/koala.dynamic-form-show-field.interface";

@Component({
  templateUrl: 'page-forms.component.html'
})
export class PageFormsComponent extends FormAbstract implements OnInit {
  public navigationHistory = NavigateHelper.navigationHistory();
  public btnLabel = 'Send';

  public formSimpleExample: FormGroup;
  public formSimpleExampleConfig: KoalaDynamicFormFieldInterface[];

  public formDynamicFieldsExample: FormGroup;
  public formDynamicFieldsExampleConfig: KoalaDynamicFormFieldInterface[];
  public formDynamicFieldsExampleShowFields = new BehaviorSubject<KoalaDynamicFormShowFieldInterface[]>(null);

  public formMoreItems: FormGroup;
  public formMoreItemsConfig: KoalaDynamicFormFieldInterface[];

  constructor(
    private fb: FormBuilder,
    private dynamicFormService: KoalaDynamicFormService
  ) {
    super(() => this.formSimpleExample);
  }

  ngOnInit() {
    this.formSimpleExample = this.fb.group({});
    this.formSimpleExampleConfig = [{
      label: 'Text Field',
      name: 'textField',
      type: DynamicFormTypeFieldEnum.text,
      appearance: "outline",
      class: 'col-12',
      fieldClass: 'w-100',
      required: true
    }];


    this.formDynamicFieldsExample = this.fb.group({});
    this.formDynamicFieldsExampleConfig = [{
      label: 'Show Field (Simple)',
      name: 'showField',
      type: DynamicFormTypeFieldEnum.radio,
      opcoesSelect: [
        {value: true, name: 'Show'},
        {value: false, name: 'Hide'}
      ],
      value: false,
      valueChanges: (showFields: boolean) => this.formDynamicFieldsExampleShowFields.next([{
        name: 'textField',
        show: showFields,
        clearCurrentValue: true
      }])
    }, {
      show: false,
      label: 'Text Field',
      name: 'textField',
      type: DynamicFormTypeFieldEnum.text,
      appearance: "outline",
      class: 'col-12',
      fieldClass: 'w-100',
      required: true
    }, {
      label: 'Show Field (Advanced)',
      name: 'showFieldAdvanced',
      type: DynamicFormTypeFieldEnum.radio,
      opcoesSelect: [
        {value: true, name: 'Show'},
        {value: false, name: 'Hide'}
      ],
      value: false,
      valueChanges: (showFields: boolean) => this.formDynamicFieldsExampleShowFields.next([{
        name: 'dynamicFields',
        show: showFields
      }])
    }, {
      show: false,
      label: 'Dynamic Fields',
      name: 'dynamicFields',
      type: DynamicFormTypeFieldEnum.dynamicForm,
      dynamicFormConfig: {
        form: this.fb.group({}),
        formConfig: [{
          label: 'Name',
          name: 'name',
          type: DynamicFormTypeFieldEnum.text,
          appearance: "outline",
          class: 'col-6',
          fieldClass: 'w-100',
          required: true
        }, {
          label: 'Lastname',
          name: 'lastname',
          type: DynamicFormTypeFieldEnum.text,
          appearance: "outline",
          class: 'col-6',
          fieldClass: 'w-100',
          required: true
        }]
      },
      required: true
    }];

    this.formMoreItems = this.fb.group({})
    this.formMoreItemsConfig = [{
      label: 'More Items',
      name: 'items',
      type: DynamicFormTypeFieldEnum.moreItems,
      moreItemsButtonIconAddlabel: 'Add Item',
      moreItemsIconFontColor: '#212121',
      moreItemsIconBackgroundColor: '#fff',
      moreItemsIcon: 'label',
      moreItemsMinItems: 1,
      moreItemsMaxItems: 2,
      moreItemsConfig: {
        form: this.fb.group({}),
        formConfig: [{
          label: 'Text Field',
          name: 'textField',
          type: DynamicFormTypeFieldEnum.text,
          appearance: "outline",
          class: 'col-12',
          fieldClass: 'w-100',
          required: true
        }]
      },
      required: true
    }];
  }

  public submit(formGroup: FormGroup) {
    this.loading(true, 'Sending...');
    const data = this.dynamicFormService.emitData(formGroup);
    setTimeout(() => {
      console.log(data);
      this.loading(false, 'Send');
    }, 2000);
  }
}

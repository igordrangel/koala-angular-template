import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import {
  KoalaDynamicFormService,
  DynamicFormTypeFieldEnum,
  KoalaDynamicFormConfigInterface,
  KoalaDynamicAutocompleteOptionsInterface
} from "@koalarx/ui/form";
import { ListService } from "../list/list.service";
import { Observable } from "rxjs";
import { UntypedFormBuilder } from "@angular/forms";
import { CustomSyncValidator } from "./validators/custom-sync.validator";
import { CustomAsyncValidator } from "./validators/custom-async.validator";
import { format } from "@koalarx/utils/operators/date";
import { first } from "rxjs/operators";

@Component({
  templateUrl: 'page-dynamic-form.component.html',
  styleUrls: ['page-dynamic-form.component.css']
})
export class PageDynamicFormComponent extends PageAbstract {
  public config: KoalaDynamicFormConfigInterface;

  constructor(
    private fb: UntypedFormBuilder,
    private listService: ListService,
    private dynamicFormService: KoalaDynamicFormService
  ) {
    super();
    this.config = dynamicFormService.build()
                                    .field('Custom Mask', 'stringCustomMasc', 'stringWithCustomMasc').grid(3).setCustomMasc("separator.3", {prefix: 'R$ ', thousandSeparator: '.'}).textHint("Uses a ngx-mask library.").generate()
                                    .field('Custom Sync Validator', 'customSyncValidator', 'text').grid(3).syncValidator([CustomSyncValidator(() => this.config)]).generate()
                                    .field('Custom Async Validator', 'customAsyncValidator', 'text').grid(3).asyncValidator([CustomAsyncValidator(() => this.config)]).generate()
                                    .field('Competence Data Field', 'competenceDate', 'competenceDate').setValue(format('now', 'MM/YYYY')).grid(3).generate()
                                    .field('Text Field', 'text', "text").addClass('field-content').addFieldClass('field-input').grid(2).generate()
                                    .field('Date Field', 'date', "date").grid(2).focus().generate()
                                    .field('Datetime Field', 'datetime', "datetime").grid(2).disabled().generate()
                                    .field('Time Field', 'time', "time").grid(2).generate()
                                    .field('CPF Field', 'cpf', "cpf").grid(2).generate()
                                    .field('CNPJ Field', 'cnpj', "cnpj").grid(2).generate()
                                    .field('Coin Field', 'coin', "coin").grid(2).generate()
                                    .field('Color Field', 'color', "color").grid(2).generate()
                                    .field('E-mail Field', 'email', "email").grid(2).generate()
                                    .field('Float Field', 'float', "float").grid(2).generate()
                                    .field('Percent Field', 'percent', "percent").grid(2).generate()
                                    .field('Hours and Minutes Field', 'hoursAndMinutes', "hoursAndMinutes").grid(2).generate()
                                    .field('Password Field', 'password', "password").grid(2).generate()
                                    .field('Phone Field', 'phone', "phone").grid(2).generate()
                                    .autocomplete('Autocomplete All Field', 'autocompleteAll').multiple().grid(2).required().service(new Observable<KoalaDynamicAutocompleteOptionsInterface[]>(observe => {
                                      this.listService.getList().pipe(first()).subscribe(list => {
                                        const options: KoalaDynamicAutocompleteOptionsInterface[] = [];
                                        list.forEach(item => options.push({
                                          value: item.value,
                                          name: item.name
                                        }));
                                        observe.next(options);
                                      })
                                    })).colorChipConfig((subject) => subject.next({
        color: 'primary'
      })).loadOptions('all').generate()
                                    .field('Select Field', 'select', "select").setOptions([
                                      {value: true, name: 'true'},
                                      {value: false, name: 'false'}
                                    ]).grid(2).generate()
                                    .field('Radio Field', 'radio', "radio").setOptions([
                                      {value: true, name: 'true'},
                                      {value: false, name: 'false'}
                                    ]).grid(2).generate()
                                    .field('Checkbox', 'checkbox', "checkbox").grid(2).generate()
                                    .field('Select Multiple Native', 'selectMultipleNative', "selectMultipleNative").setOptions([
        {value: 1, name: 'Item 1'},
        {value: 2, name: 'Item 2'},
        {value: 3, name: 'Item 3'},
        {value: 4, name: 'Item 4'},
        {value: 5, name: 'Item 5'},
        {value: 6, name: 'Item 6'}
      ]).required().textHint('Selecione um ou mais Items').generate()
                                    .simpleMoreItems('More Items', 'moreItems', 'Add Item', 1, 2)
                                      .build()
                                      .field('Text Field', 'text', "text").grid(3).maxLength(10).generate()
                                      .field('Date Field', 'date', "date").grid(3).generate()
                                      .field('Number Field', 'number', "number").grid(3).min(5).max(10).generate()
                                      .field('String Number Field', 'stringNumber', "stringNumber").grid(3).maxLength(4).generate()
                                    .generateMoreItems()
                                    .literalConfig({
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
                                        }]
                                      },
                                      required: true
                                    })
                                    .field('Textarea Field', 'textarea', "textarea").maxLength(1000).generate()
                                    .field('ValueList Field', 'valueList', "valueList").generate()
                                    .field('TextLogs Field', 'textLogs', "textLogs").generate()
                                    .field('DynamicForm', 'dynamicForm', 'select').setOptions([
        {value: true, name: 'Show'},
        {value: false, name: 'Hide'}
      ]).valueChanges((value: boolean) => {
        this.config.showFields.next([
          {name: 'dynamicFormShow', show: value}
        ])
      }).generate()
                                    .literalConfig({
                                      show: false,
                                      label: 'DynamicForm Showed',
                                      name: 'dynamicFormShow',
                                      type: DynamicFormTypeFieldEnum.dynamicForm,
                                      dynamicFormConfig: this.dynamicFormService
                                                             .build()
                                                             .field('Option', 'option', "select").setOptions([
                                          {value: '1', name: 'Option 1'},
                                          {value: '2', name: 'Option 2'}
                                        ]).generate()
                                                             .generate()
                                    })
                                    .autofill({
                                      text: 'Teste 123',
                                      dynamicForm: false,
                                      dynamicFormShow: {
                                        option: '1'
                                      },
                                      moreItems: [
                                        {
                                          text: '123',
                                          date: format('now', 'YYYY-MM-DD'),
                                          number: 6
                                        }
                                      ],
                                      selectMultipleNative: [1,2],
                                      textLogs: 'teste 123'
                                    })
                                    .generate();

    setTimeout(() => {
      dynamicFormService.updateValidator(
        this.config.form,
        'date',
        'required',
        true
      );
      dynamicFormService.updateValidator(
        this.config.form,
        'date',
        'min',
        format('now', 'YYYY-MM-DD')
      );
    }, 5000);
  }
}

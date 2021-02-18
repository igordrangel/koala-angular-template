import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { KoalaDynamicFormService } from "../../../../../ngx-koala/src/lib/shared/services/dynamic-forms/koala.dynamic-form.service";
import { ListService } from "../../components/list/list.service";
import { KoalaDynamicAutocompleteOptionsInterface } from "../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/koala.dynamic-autocomplete-options.interface";
import { Observable } from "rxjs";
import { koala } from "koala-utils";
import { DynamicFormTypeFieldEnum } from "../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { FormBuilder } from "@angular/forms";
import { KoalaDynamicFormConfigInterface } from "../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/koala.dynamic-form-config.interface";

@Component({
  templateUrl: 'page-dynamic-form.component.html',
  styleUrls: ['page-dynamic-form.component.css']
})
export class PageDynamicFormComponent extends PageAbstract {
  public config: KoalaDynamicFormConfigInterface;

  constructor(
    private fb: FormBuilder,
    private listService: ListService,
    private dynamicFormService: KoalaDynamicFormService
  ) {
    super();
    this.config = dynamicFormService.build()
                                    .field('Text Field', 'text', "text").addClass('field-content').addFieldClass('field-input').grid(2).generate()
                                    .field('Date Field', 'date', "date").grid(2).focus().generate()
                                    .field('Datetime Field', 'datetime', "datetime").grid(2).generate()
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
                                    .autocomplete('Autocomplete All Field', 'autocompleteAll').grid(2).required()
                                    .service(new Observable<KoalaDynamicAutocompleteOptionsInterface[]>(observe => {
                                      this.listService.getList().subscribe(list => {
                                        const options: KoalaDynamicAutocompleteOptionsInterface[] = [];
                                        list.forEach(item => options.push({
                                          value: item.value,
                                          name: item.name
                                        }));
                                        observe.next(options);
                                      })
                                    })).loadOptions('all').generate()
                                    .field('Select Field', 'select', "select")
                                    .setOptions([
                                      {value: true, name: 'true'},
                                      {value: false, name: 'false'}
                                    ]).grid(2).generate()
                                    .field('Radio Field', 'radio', "radio")
                                    .setOptions([
                                      {value: true, name: 'true'},
                                      {value: false, name: 'false'}
                                    ]).grid(2).generate()
                                    .field('Checkbox', 'checkbox', "checkbox").grid(2).generate()
                                    .simpleMoreItems('More Items', 'moreItems', 'Add Item', 1, 2)
                                      .build()
                                        .field('Text Field', 'text', "text").grid(4).maxLength(10).generate()
                                        .field('Date Field', 'date', "date").grid(4).generate()
                                        .field('Number Field', 'number', "number").grid(4).min(5).max(10).generate()
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
                                        {text: '123', date: koala('now').date().format('YYYY-MM-DD').getValue(), number: 6}
                                      ],
                                      textLogs: 'teste 123'
                                    })
                                    .generate();
  }
}

import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { KoalaDynamicFormService } from "../../../../../ngx-koala/src/lib/shared/services/dynamic-forms/koala.dynamic-form.service";
import { ListService } from "../../components/list/list.service";
import { KoalaDynamicAutocompleteOptionsInterface } from "../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/koala.dynamic-autocomplete-options.interface";
import { Observable } from "rxjs";
import { KoalaDynamicFormConfigInterface } from "../../../../../ngx-koala/src/lib/shared/services/dynamic-forms/builder/koala.dynamic-form-config.interface";

@Component({
  templateUrl: 'page-dynamic-form.component.html',
  styleUrls: ['page-dynamic-form.component.css']
})
export class PageDynamicFormComponent extends PageAbstract {
  public config: KoalaDynamicFormConfigInterface;

  constructor(
    private listService: ListService,
    private dynamicFormService: KoalaDynamicFormService
  ) {
    super();
    this.config = dynamicFormService.build()
                                    .field('Text Field', 'text', "text").grid(2).generate()
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
                                    .field('Textarea Field', 'textarea', "textarea").generate()
                                    .field('ValueList Field', 'valueList', "valueList").generate()
                                    .field('TextLogs Field', 'textLogs', "textLogs").generate()
                                    .moreItems('More Items', 'moreItems', 'Add Item', 0, 2)
                                      .build()
                                      .field('Text Field', 'text', "text").generate()
                                    .autofill({
                                      text: 'Teste 123'
                                    })
                                    .generate();
  }
}

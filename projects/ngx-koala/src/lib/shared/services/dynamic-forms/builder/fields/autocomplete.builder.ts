import { FieldBase } from "./field.base";
import { DynamicFormTypeFieldEnum } from "../../../../components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { BehaviorSubject, Observable } from "rxjs";
import { KoalaDynamicAutocompleteOptionsInterface } from "../../../../components/form/dynamic-form/interfaces/koala.dynamic-autocomplete-options.interface";
import { FormBuilder } from "@angular/forms";
import { KoalaDynamicFormConfigInterface } from "../../../../components/form/dynamic-form/interfaces/koala.dynamic-form-config.interface";

export class AutocompleteBuilder extends FieldBase {
  private service$: Observable<KoalaDynamicAutocompleteOptionsInterface[]>;

  constructor(
    label: string,
    name: string,
    formConfig: KoalaDynamicFormConfigInterface,
    fb: FormBuilder
  ) {
    super(label, name, DynamicFormTypeFieldEnum.autocomplete, formConfig, fb);
  }

  public service(service: Observable<KoalaDynamicAutocompleteOptionsInterface[]>) {
    this.service$ = service;
    return this;
  }

  public defaultValueOnClean(value: any) {
    this.fieldConfig.autocompleteDefaultValueOnClear = value;
    return this;
  }

  public loadOptions(type: 'all'|'onDemand', onDemandFilter?: (filter: string) => Observable<KoalaDynamicAutocompleteOptionsInterface[]>) {
    this.fieldConfig.autocompleteType = type;

    if (type === "all") {
      const options$ = new BehaviorSubject<KoalaDynamicAutocompleteOptionsInterface[]>([]);
      this.service$.subscribe(options => options$.next(options));
      this.fieldConfig.autocompleteOptions = options$;
    } else {
      this.fieldConfig.autocompleteFilter = onDemandFilter;
    }

    return this;
  }
}

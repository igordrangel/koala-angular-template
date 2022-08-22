import { KoalaDynamicFormConfigInterface } from "../../interfaces/koala.dynamic-form-config.interface";
import { DynamicFormTypeFieldEnum } from "../../enums/dynamic-form-type-field.enum";
import { BehaviorSubject, Observable } from "rxjs";
import { KoalaDynamicAutocompleteOptionsInterface } from "../../interfaces/koala.dynamic-autocomplete-options.interface";
import { UntypedFormBuilder } from "@angular/forms";
import { KoalaDynamicFormAutocompleteMultipleConfigInterface } from "../../interfaces/koala.dynamic-form-autocomplete-multiple-config.interface";
import { FieldBase } from "./field.base";
import { DeviceDetectorService } from "ngx-device-detector";

export class AutocompleteBuilder extends FieldBase {
  private service$: Observable<KoalaDynamicAutocompleteOptionsInterface[]>;

  constructor(
    label: string,
    name: string,
    formConfig: KoalaDynamicFormConfigInterface,
    fb: UntypedFormBuilder,
    deviceService: DeviceDetectorService
  ) {
    super(label, name, DynamicFormTypeFieldEnum.autocomplete, formConfig, fb, deviceService);
  }

  public service(service: Observable<KoalaDynamicAutocompleteOptionsInterface[]>) {
    this.service$ = service;
    return this;
  }

  public defaultValueOnClean(value: any) {
    this.fieldConfig.autocompleteDefaultValueOnClear = value;
    return this;
  }

  public loadOptions(type: 'all' | 'onDemand', onDemandFilter?: (filter: string) => Observable<KoalaDynamicAutocompleteOptionsInterface[]>) {
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

  public colorChipConfig(fn: (subject: BehaviorSubject<KoalaDynamicFormAutocompleteMultipleConfigInterface>) => void) {
    this.fieldConfig.autocompleteMultipleConfig = new BehaviorSubject<KoalaDynamicFormAutocompleteMultipleConfigInterface>(null);
    fn(this.fieldConfig.autocompleteMultipleConfig);
    return this;
  }
}

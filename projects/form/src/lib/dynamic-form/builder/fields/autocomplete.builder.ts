import { BehaviorSubject, Observable } from "rxjs";
import { UntypedFormBuilder } from "@angular/forms";
import { FieldBase } from "./field.base";
import { DeviceDetectorService } from "ngx-device-detector";
import {
  DynamicFormTypeFieldEnum,
  KoalaDynamicAutocompleteOptionsInterface,
  KoalaDynamicFormAutocompleteMultipleConfigInterface, KoalaDynamicFormConfigInterface
} from "@koalarx/ui/form";

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

  public addOption(active: boolean = true) {
    this.fieldConfig.autocompleteAddOption = active;
    return this;
  }
}

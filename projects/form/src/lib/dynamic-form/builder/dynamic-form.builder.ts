import { UntypedFormBuilder } from "@angular/forms";
import { KoalaDynamicFormConfigInterface } from "../interfaces/koala.dynamic-form-config.interface";
import { KoalaDynamicFormFieldInterface } from "../interfaces/koala.dynamic-form-field.interface";
import { DynamicFormTypeFieldEnum } from "../enums/dynamic-form-type-field.enum";
import { AutocompleteBuilder } from "./fields/autocomplete.builder";
import { BehaviorSubject } from "rxjs";
import { KoalaDynamicSetValueInterface } from "../interfaces/koala.dynamic-set-value.interface";
import { KoalaDynamicFormShowFieldInterface } from "../interfaces/koala.dynamic-form-show-field.interface";
import { koala } from "@koalarx/utils";
import { DeviceDetectorService } from "ngx-device-detector";
import { FieldBuilder } from "./fields/field.builder";
import { MoreItemsBuilder } from "./fields/more-items.builder";

export type DynamicFormFieldType = 'text' | 'password' | 'cpf' | 'cnpj' | 'datetime' | 'email' | 'phone' | 'number' | 'stringNumber' | 'valueList' | 'textarea' | 'time' | 'hoursAndMinutes' | 'checkbox' | 'select' | 'selectMultipleNative' | 'coin' | 'percent' | 'id' | 'textLogs' | 'color' | 'date' | 'radio' | 'float' | 'month' | 'competenceDate' | 'stringWithCustomMasc';

export class DynamicFormBuilder {
  private readonly config: KoalaDynamicFormConfigInterface;

  constructor(
    private fb: UntypedFormBuilder,
    private deviceService: DeviceDetectorService,
    configInMemory?: KoalaDynamicFormFieldInterface[]) {
    this.config = {
      form: fb.group({}),
      formConfig: configInMemory ?? [],
      setValues: new BehaviorSubject<KoalaDynamicSetValueInterface[]>(null),
      showFields: new BehaviorSubject<KoalaDynamicFormShowFieldInterface[]>(null)
    }
  }

  public field(label: string, name: string, type: DynamicFormFieldType) {
    switch (type) {
      case "id":
      case "text":
      case "textarea":
      case "number":
      case "stringNumber":
      case "cnpj":
      case "cpf":
      case "coin":
      case "color":
      case "date":
      case "datetime":
      case "email":
      case "float":
      case "password":
      case "percent":
      case "phone":
      case "time":
      case "hoursAndMinutes":
      case "textLogs":
      case "valueList":
      case "checkbox":
      case "radio":
      case "select":
      case "selectMultipleNative":
      case "month":
      case "competenceDate":
      case "stringWithCustomMasc":
        return new FieldBuilder(label, name, DynamicFormTypeFieldEnum[type], this.config, this.fb, this.deviceService);
    }
  }

  public autocomplete(label: string, name: string) {
    return new AutocompleteBuilder(label, name, this.config, this.fb, this.deviceService);
  }

  public simpleMoreItems(label: string, name: string, btnAddLabel: string, min: number, max: number) {
    return new MoreItemsBuilder(
      label,
      name,
      btnAddLabel,
      min,
      max,
      this.config,
      this.fb,
      this.deviceService
    );
  }

  public autofill(object: any) {
    if (object) {
      const setValues: KoalaDynamicSetValueInterface[] = [];
      Object.keys(object).forEach(indexName => {

        const arrField = koala(this.config.formConfig).array<KoalaDynamicFormFieldInterface>().filter(indexName, 'name', {comparator: "="}).getValue();
        if (arrField.length === 1) {

          const field = arrField[0] ?? null;

          if (
            typeof object[indexName] !== "object" ||
            field.type === DynamicFormTypeFieldEnum.autocomplete ||
            field.type === DynamicFormTypeFieldEnum.selectMultipleNative
          ) {
            if (field.type === DynamicFormTypeFieldEnum.textLogs) {
              field.textObs = object[indexName];
            } else {
              setValues.push({
                name: indexName,
                value: object[indexName]
              });
            }
          } else {
            if (field.type === DynamicFormTypeFieldEnum.moreItems) {
              const setValuesMoreItems = [];
              const objectMoreItems = object[indexName] as any[];
              objectMoreItems.forEach(objectItem => {
                const moreItemValues: KoalaDynamicSetValueInterface[] = [];
                Object.keys(objectItem).forEach(objectIndexName => {
                  moreItemValues.push({
                    name: objectIndexName,
                    value: objectItem[objectIndexName]
                  });
                });
                setValuesMoreItems.push(new BehaviorSubject<KoalaDynamicSetValueInterface[]>(moreItemValues));
              });

              field.moreItemsConfig?.setValues?.next(setValuesMoreItems);
            } else if (field.type === DynamicFormTypeFieldEnum.dynamicForm) {
              const dynamicFormObject = object[indexName];
              const dynamicFormSetValues: KoalaDynamicSetValueInterface[] = [];

              Object.keys(dynamicFormObject).forEach(dynamicFormIndexName => {
                const arrDynamicField = koala(field.dynamicFormConfig.formConfig).array<KoalaDynamicFormFieldInterface>().filter(indexName, 'name').getValue();
                const dynamicField = arrDynamicField[0] ?? null;

                if (dynamicField?.type === DynamicFormTypeFieldEnum.textLogs) {
                  dynamicField.textObs = object[indexName];
                } else {
                  dynamicFormSetValues.push({
                    name: dynamicFormIndexName,
                    value: dynamicFormObject[dynamicFormIndexName]
                  });
                }
              });

              field.dynamicFormConfig?.setValues?.next(dynamicFormSetValues);
            } else {
              this.autofill(object[indexName]);
            }
          }
        }
      });
      this.config?.setValues?.next(setValues);
    }

    return this;
  }

  public literalConfig(config: KoalaDynamicFormFieldInterface) {
    this.config.formConfig.push(config);
    if (config.type === DynamicFormTypeFieldEnum.moreItems) this.generateMoreItems();
    return this;
  }

  public generate() {
    this.config.formConfig = this.config.formConfig.filter(config => config.name !== 'endMoreItems');
    return this.config;
  }

  public generateMoreItems() {
    this.config.formConfig.push({
                                  name: 'endMoreItems',
                                  type: DynamicFormTypeFieldEnum.moreItems
                                });
    return new DynamicFormBuilder(
      this.fb,
      this.deviceService,
      this.config.formConfig
    );
  }
}

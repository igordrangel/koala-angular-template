import { FormBuilder } from "@angular/forms";
import { FieldBuilder } from "./fields/field.builder";
import { KoalaDynamicFormFieldInterface } from "../../../components/form/dynamic-form/interfaces/koala.dynamic-form-field.interface";
import { DynamicFormTypeFieldEnum } from "../../../components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { AutocompleteBuilder } from "./fields/autocomplete.builder";
import { BehaviorSubject } from "rxjs";
import { KoalaDynamicSetValueInterface } from "../../../components/form/dynamic-form/interfaces/koala.dynamic-set-value.interface";
import { KoalaDynamicFormShowFieldInterface } from "../../../components/form/dynamic-form/interfaces/koala.dynamic-form-show-field.interface";
import { MoreItemsBuilder } from "./fields/more-items.builder";
import { koala } from "koala-utils";
import { KoalaDynamicFormConfigInterface } from "../../../components/form/dynamic-form/interfaces/koala.dynamic-form-config.interface";

export type DynamicFormFieldType = 'text' | 'password' | 'cpf' | 'cnpj' | 'datetime' | 'email' | 'phone' | 'number' | 'valueList' | 'textarea' | 'time' | 'hoursAndMinutes' | 'checkbox' | 'select' | 'coin' | 'percent' | 'id' | 'textLogs' | 'file' | 'color' | 'date' | 'radio' | 'float';

export class DynamicFormBuilder {
  private readonly config: KoalaDynamicFormConfigInterface;
  private newField: FieldBuilder;
  private newAutocomplete: AutocompleteBuilder;
  private newMoreItems: MoreItemsBuilder;

  constructor(private fb: FormBuilder, configInMemory?: KoalaDynamicFormFieldInterface[]) {
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
        this.newField = new FieldBuilder(label, name, DynamicFormTypeFieldEnum[type], this.config, this.fb);
        return this.newField;
    }
  }

  public autocomplete(label: string, name: string) {
    this.newAutocomplete = new AutocompleteBuilder(label, name, this.config, this.fb);
    return this.newAutocomplete;
  }

  public simpleMoreItems(label: string, name: string, btnAddLabel: string, min: number, max: number) {
    this.newMoreItems = new MoreItemsBuilder(
      label,
      name,
      btnAddLabel,
      min,
      max,
      this.config,
      this.fb
    );
    return this.newMoreItems;
  }

  public autofill(object: any) {
    const setValues: KoalaDynamicSetValueInterface[] = [];
    Object.keys(object).forEach(indexName => {
      if (typeof object[indexName] !== "object") {
        const arrField = koala(this.config.formConfig).array<KoalaDynamicFormFieldInterface>().filter(indexName, 'name').getValue();
        const field = arrField[0] ?? null;

        if (field?.type === DynamicFormTypeFieldEnum.textLogs) {
          field.textObs = object[indexName];
        } else {
          setValues.push({
            name: indexName,
            value: object[indexName]
          });
        }
      } else {
        const arrField = koala(this.config.formConfig).array<KoalaDynamicFormFieldInterface>().filter(indexName, 'name').getValue();
        const field = arrField[0];

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

          field.moreItemsConfig.setValues.next(setValuesMoreItems);
        } else if(field.type === DynamicFormTypeFieldEnum.dynamicForm) {
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

          field.dynamicFormConfig.setValues.next(dynamicFormSetValues);
        } else {
          this.autofill(object[indexName]);
        }
      }
    });

    this.config.setValues.next(setValues);
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
      this.config.formConfig
    );
  }
}

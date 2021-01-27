import { FormBuilder, FormGroup } from "@angular/forms";
import { KoalaDynamicFormConfigInterface } from "./koala.dynamic-form-config.interface";
import { FieldBuilder } from "./fields/field.builder";
import { KoalaDynamicFormFieldInterface } from "../../../components/form/dynamic-form/interfaces/koala.dynamic-form-field.interface";
import { DynamicFormTypeFieldEnum } from "../../../components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { AutocompleteBuilder } from "./fields/autocomplete.builder";
import { BehaviorSubject } from "rxjs";
import { KoalaDynamicSetValueInterface } from "../../../components/form/dynamic-form/interfaces/koala.dynamic-set-value.interface";
import { KoalaDynamicFormShowFieldInterface } from "../../../components/form/dynamic-form/interfaces/koala.dynamic-form-show-field.interface";
import { MoreItemsBuilder } from "./fields/more-items.builder";

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

  public moreItems(label: string, name: string, btnAddLabel: string, min: number, max: number) {
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
        setValues.push({
          name: indexName,
          value: object[indexName]
        });
      }
    });

    this.config.setValues.next(setValues);
    return this;
  }

  public generate() {
    return this.config;
  }
}

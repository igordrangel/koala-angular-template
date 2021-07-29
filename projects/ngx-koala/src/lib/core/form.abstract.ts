import { ShowInvalidFields } from '../shared/components/form/show-invalid-fields/show-invalid-fields';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export abstract class FormAbstract {
  public showInvalidFields: ShowInvalidFields;
  public btnLabel: string;
  public loader = new BehaviorSubject<boolean>(false);
  public btnSubmitDisabled = false;
  public getData = new BehaviorSubject<boolean>(false);

  protected constructor(private formAbstract: () => FormGroup) {
  }

  public selecionarAutocomplete(controlName: string, obj: any, indexName?: string) {
    if (obj) {
      let value = indexName ? obj[indexName] : obj;
      if (Array.isArray(obj)) {
        value = [];
        obj.forEach(item => {
          value.push(indexName ? item[indexName] : item);
        });
      }

      this.formAbstract().get(controlName).setValue(value);
    } else {
      this.formAbstract().get(controlName).setValue('');
    }
  }

  public btnClickGetData() {
    this.getData.next(true);
  }

  protected enableShowInvalidFields() {
    this.showInvalidFields = new ShowInvalidFields();
  }

  protected loading(show: boolean = true, btnLabel?: string) {
    this.btnSubmitDisabled = show;
    this.loader.next(show);

    if (show) {
      this.btnLabel = btnLabel ? btnLabel : 'Enviando Dados...';
    } else {
      this.btnLabel = btnLabel ? btnLabel : 'Enviar';
    }
  }
}

import { ShowInvalidFields } from '../shared/components/form/show-invalid-fields/show-invalid-fields';
import { FormGroup } from '@angular/forms';

export abstract class FormAbstract {
  public showInvalidFields: ShowInvalidFields;
  public btnLabel: string = "Enviar";
  public loader: boolean = false;
  public btnSubmitDisabled: boolean = false;

  protected constructor(private _form: () => FormGroup) {
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

      this._form().get(controlName).setValue(value);
    } else {
      this._form().get(controlName).setValue('');
    }
  }

  protected enableShowInvalidFields() {
    this.showInvalidFields = new ShowInvalidFields();
  }

  protected loading(show: boolean = true, btnLabel?: string) {
    this.btnSubmitDisabled = show;
    this.loader = show;

    if (show) {
      this.btnLabel = btnLabel ? btnLabel : "Enviando Dados...";
      //LoaderController.create({typeLoader: "indeterminate"});
    } else {
      this.btnLabel = btnLabel ? btnLabel : "Enviar";
      //LoaderController.dismiss();
    }
  }
}

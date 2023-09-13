import { Component, Inject } from "@angular/core";
import { KoalaRequestService } from "@koalarx/ui/core";
import { FormAbstract, KoalaDynamicFormService, KoalaDynamicFormConfigInterface } from "@koalarx/ui/form";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ItemInterface, ItemService } from "../item.service";
import { KoalaSnackbarService } from "@koalarx/ui/snackbar";

@Component({
  templateUrl: 'dialog-form-item.component.html'
})
export class DialogFormItemComponent extends FormAbstract {
  public formConfig: KoalaDynamicFormConfigInterface;

  constructor(
    private dynamicFormService: KoalaDynamicFormService,
    private requestService: KoalaRequestService,
    private itemService: ItemService,
    private dialogRef: MatDialogRef<DialogFormItemComponent>,
    private snackbarService: KoalaSnackbarService,
    @Inject(MAT_DIALOG_DATA) public item?: ItemInterface
  ) {
    super(() => this.formConfig.form);
    this.formConfig = dynamicFormService.build()
                                        .field('','id', 'id').generate()
                                        .field('Name', 'name', 'text').maxLength(40).required().focus().generate()
                                        .field('Description', 'description', 'textarea').maxLength(5000).required().generate()
                                        .autofill(item)
                                        .generate();
  }

  public save() {
    this.loading(true, 'Sending Data...');
    this.requestService
        .request(
          this.itemService.save(this.dynamicFormService.emitData(this.formConfig.form) as ItemInterface),
          response => {
            console.log(response);
            this.snackbarService.success('Object saved with success!');
            this.dialogRef.close('reloadList');
          },
          error => {
            console.error(error);
            this.loading(false, 'Try Again');
          }
        )
  }
}

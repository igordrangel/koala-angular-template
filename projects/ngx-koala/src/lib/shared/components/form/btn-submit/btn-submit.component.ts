import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'koala-submit',
  templateUrl: 'btn-submit.component.html',
  styleUrls: ['btn-submit.component.css']
})
export class BtnSubmitComponent {
  @Input() fg: FormGroup;
  @Input() color: ThemePalette = 'primary';
  @Input() btnLabel: string = 'Enviar';
  @Input() btnSubmitDisabled: boolean = false;
  @Input() loader: boolean = false;
}

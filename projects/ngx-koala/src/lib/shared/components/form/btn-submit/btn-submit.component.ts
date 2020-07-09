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
  @Input() btnLabel = 'Enviar';
  @Input() btnSubmitDisabled = false;
  @Input() loader = false;
  @Input() iconButton: boolean;
  @Input() icon: string;
  @Input() iconColor: 'blue' | 'red' | 'yellow' | 'black' | 'green';
}

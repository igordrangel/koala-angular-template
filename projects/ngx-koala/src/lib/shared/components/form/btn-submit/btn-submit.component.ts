import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'koala-submit',
  templateUrl: 'btn-submit.component.html',
  styleUrls: ['btn-submit.component.css']
})
export class BtnSubmitComponent implements OnChanges {
  @Input() fg: FormGroup;
  @Input() color: ThemePalette = 'primary';
  @Input() btnLabel = 'Enviar';
  @Input() btnSubmitDisabled = false;
  @Input() loader: BehaviorSubject<boolean>;
  @Input() iconButton: boolean;
  @Input() icon: string;
  @Input() iconColor: 'blue' | 'red' | 'yellow' | 'black' | 'green';
  public disabled = new BehaviorSubject<boolean>(false);
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.btnSubmitDisabled) {
      this.disabled.next(changes.btnSubmitDisabled.currentValue);
    }
  }
}

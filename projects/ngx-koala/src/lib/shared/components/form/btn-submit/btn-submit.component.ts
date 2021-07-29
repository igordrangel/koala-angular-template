import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';
import { KoalaLanguageHelper } from "../../../helpers/koala-language.helper";

@Component({
  selector: 'koala-submit',
  templateUrl: 'btn-submit.component.html',
  styleUrls: ['btn-submit.component.css']
})
export class BtnSubmitComponent implements OnInit, OnChanges {
  @Input() fg: FormGroup;
  @Input() color: ThemePalette = 'primary';
  @Input() btnLabel = KoalaLanguageHelper.getBtnLabel();
  @Input() btnSubmitDisabled = false;
  @Input() loader: BehaviorSubject<boolean>;
  @Input() iconButton: boolean;
  @Input() icon: string;
  @Input() iconColor: 'blue' | 'red' | 'yellow' | 'black' | 'green';
  public disabled = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    if (!this.btnLabel) {
      this.btnLabel = KoalaLanguageHelper.getBtnLabel();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.btnSubmitDisabled) {
      this.disabled.next(changes.btnSubmitDisabled.currentValue);
    }
  }
}

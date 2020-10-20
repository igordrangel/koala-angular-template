import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'koala-submit',
  templateUrl: 'btn-submit.component.html',
  styleUrls: ['btn-submit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnSubmitComponent implements OnInit, OnChanges {
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
  
  ngOnInit() {
    this.disabled.next(this.fg.invalid || this.fg.pending || this.btnSubmitDisabled);
    this.fg
        .valueChanges
        .pipe(debounceTime(300))
        .subscribe(() => this.disabled.next(
          this.fg.invalid ||
          this.fg.pending ||
          this.btnSubmitDisabled
        ));
  }
}

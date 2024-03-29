import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { KoalaIconType } from '@koalarx/ui/icon';

@Component({
  selector: 'koala-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input() color: string = '#fff';
  @Input() backgroundColor: string = '#000';
  @Input() icon?: string | KoalaIconType;
  @Input() text?: string;
  @Input() tooltip?: string;
  @Input() disabled?: boolean;
  @Input() koalaIcon: boolean = false;
  @Input() koalaIconSize: number = 20;
  public style?: string;

  ngOnInit() {
    this.style = `color: ${this.color}!important;background-color: ${this.backgroundColor}!important;`;
  }

  public getKoalaIcon() {
    return this.icon as KoalaIconType;
  }
}

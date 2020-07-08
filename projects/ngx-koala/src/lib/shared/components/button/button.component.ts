import { Component, Input } from '@angular/core';

@Component({
  selector: 'koala-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.css']
})
export class ButtonComponent {
  @Input() color: 'blue' | 'red' | 'yellow' | 'black' | 'green';
  @Input() icon: string;
  @Input() text: string;
  @Input() tooltip: string;
}

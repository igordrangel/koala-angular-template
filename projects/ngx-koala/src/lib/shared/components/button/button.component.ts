import { Component, Input } from '@angular/core';

@Component({
  selector: 'koala-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.css']
})
export class ButtonComponent {
  @Input() color: 'blue' | 'red' | 'gray' | 'white' = 'white';
  @Input() backgroundColor: 'blue' | 'red' | 'gray' | 'white' | 'transparent' = 'blue';
  @Input() icon: string;
  @Input() text: string;
  @Input() tooltip: string;
}

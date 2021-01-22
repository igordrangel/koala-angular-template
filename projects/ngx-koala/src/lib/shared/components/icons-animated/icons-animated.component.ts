import { Component, Input } from "@angular/core";

@Component({
  selector: 'koala-icon-animated',
  templateUrl: 'icons-animated.component.html'
})
export class IconsAnimatedComponent {
  @Input() icon: 'loader';
  @Input() color: string;
  @Input() size: number;
}

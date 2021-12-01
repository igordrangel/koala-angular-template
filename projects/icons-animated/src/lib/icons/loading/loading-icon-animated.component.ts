import { Component, Input, OnInit } from "@angular/core";
import { IconsAnimatedService } from "../../icons-animated.service";

@Component({
  selector: 'koala-icon-animated-loading',
  templateUrl: 'loading-icon-animated.component.html',
  styleUrls: ['loading-icon-animated.component.css'],
  providers: [IconsAnimatedService]
})
export class LoadingIconAnimatedComponent implements OnInit {
  @Input() size?: number;
  @Input() color?: string;

  constructor(public iconService: IconsAnimatedService) {
  }

  ngOnInit() {
    this.iconService.init('loading', this.size ?? 22, this.color ?? '#000');
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { IconsAnimatedService } from "../../icons-animated.service";

@Component({
  selector: 'koala-icon-animated-loader',
  templateUrl: 'loader-icon-animated.component.html',
  styleUrls: ['loader-icon-animated.component.css'],
  providers: [IconsAnimatedService]
})
export class LoaderIconAnimatedComponent implements OnInit {
  @Input() size: number;
  @Input() color: string;

  constructor(public iconService: IconsAnimatedService) {
  }

  ngOnInit() {
    this.iconService.init('loader', this.size, this.color);
  }
}

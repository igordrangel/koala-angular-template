import { Component, Input, OnInit } from "@angular/core";
import { IconsAnimatedService } from "../../icons-animated.service";

@Component({
  selector: 'koala-icon-animated-downloading',
  templateUrl: 'downloading-icon-animated.component.html',
  styleUrls: ['downloading-icon-animated.component.css'],
  providers: [IconsAnimatedService]
})
export class DownloadingIconAnimatedComponent implements OnInit {
  @Input() size?: number;
  @Input() color?: string;

  constructor(public iconService: IconsAnimatedService) {
  }

  ngOnInit() {
    this.iconService.init('downloading', this.size ?? 22, this.color ?? '#000');
  }
}

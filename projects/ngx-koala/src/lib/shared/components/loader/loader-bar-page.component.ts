import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-loader-page',
  templateUrl: 'loader-bar-page.component.html',
  styleUrls: ['loader-bar-page.component.css']
})
export class LoaderBarPageComponent {
  @Input() show: boolean = false;
  @Input() progress: number = 0;
  @Input() typeLoader: string = 'indeterminate'
}

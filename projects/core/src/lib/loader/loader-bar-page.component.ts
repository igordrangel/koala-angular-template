import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loader-page',
  templateUrl: 'loader-bar-page.component.html',
  styleUrls: ['loader-bar-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderBarPageComponent {
  @Input() show: boolean = false;
  @Input() progress: number = 0;
  @Input() typeLoader: ProgressBarMode = 'indeterminate';
}

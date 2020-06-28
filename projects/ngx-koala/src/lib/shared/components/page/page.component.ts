import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'koala-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.css']
})
export class PageComponent {
  @Input() color: ThemePalette;
  @Input() startMenuOpened = true;
}

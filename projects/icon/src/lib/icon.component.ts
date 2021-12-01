import { Component, Input, OnInit } from '@angular/core';
import { koala } from "@koalarx/utils";
import { KoalaIconType } from './koala.icon.type';

@Component({
  selector: 'koala-icon',
  templateUrl: 'icon.component.html',
  styleUrls: ['icon.component.css']
})
export class IconComponent implements OnInit {
  @Input() color?: string;
  @Input() icon?: KoalaIconType;
  @Input() size: number = 24;

  public intervalCheckElement: any;
  public style?: string;
  public idIcon = `koala-icons_${koala(0).number().random(1, 999999999).getValue()}`;

  ngOnInit() {
    do {
      this.idIcon = `koala-icons_${koala(0).number().random(1, 999999999).getValue()}`;
    } while (document.getElementById(this.idIcon));

    this.style = `width: ${this.size}px;height: ${this.size}px;`;
    this.intervalCheckElement = setInterval(() => {
      const mainElementSelector = `svg#${this.idIcon}.${this.icon}`;
      const elSvgIcon = document.querySelector(mainElementSelector) as SVGElement;
      if (elSvgIcon) {
        document.querySelectorAll<SVGPathElement>(`
          ${mainElementSelector} path,
          ${mainElementSelector} rect,
          ${mainElementSelector} circle,
          ${mainElementSelector} polygon
        `).forEach((el) => {
          if (!el.style.fill) {
            el.style.fill = this.color ?? '';
          }
        });
        clearInterval(this.intervalCheckElement);
      }
    }, 1);
  }
}

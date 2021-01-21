import { Component, Input, OnInit } from '@angular/core';
import { koala } from "koala-utils";

@Component({
  selector: 'koala-icon',
  templateUrl: 'icon.component.html',
  styleUrls: ['icon.component.css']
})
export class IconComponent implements OnInit {
  @Input() color: string;
  @Input() icon: 'notFound'|'notAllowed'|'sessionExpired'|'empty'|'excel'|'word'|'pdf'|'edit'|'trash'|'webComponents'|'deliveryBox'|'github';
  @Input() size: number = 24;

  public intervalCheckElement: number;
  public style: string;
  public idIcon = `koala-icons_${koala(0).number().random(1, 30).getValue()}`;

  ngOnInit() {
    this.style = `width: ${this.size}px;height: ${this.size}px;`;
    this.intervalCheckElement = setInterval(() => {
      const mainElementSelector = `svg#${this.idIcon}.${this.icon}`;
      const elSvgIcon = document.querySelector(mainElementSelector) as SVGElement;
      if (elSvgIcon) {
        document.querySelectorAll(`
          ${mainElementSelector} path,
          ${mainElementSelector} rect,
          ${mainElementSelector} circle,
          ${mainElementSelector} polygon
        `).forEach((el: SVGPathElement) => {
          if (!el.style.fill) {
            el.style.fill = this.color;
          }
        });
        clearInterval(this.intervalCheckElement);
      }
    }, 1);
  }
}

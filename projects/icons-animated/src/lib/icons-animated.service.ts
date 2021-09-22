import { Injectable } from "@angular/core";
import { koala } from "@koalarx/utils";

@Injectable()
export class IconsAnimatedService {
  public intervalCheckElement: any;
  public style?: string;
  public idIcon?: string;

  public init(icon: string, size: number, color: string) {
    this.idIcon = `koala-icons_${koala(0).number().random(1, 30).getValue()}`;
    this.style = `width: ${size}px;height: ${size}px;`;
    this.intervalCheckElement = setInterval(() => {
      const mainElementSelector = `svg#${this.idIcon}.${icon}`;
      const elSvgIcon = document.querySelector(mainElementSelector) as SVGElement;
      if (elSvgIcon) {
        document.querySelectorAll<SVGPathElement>(`
          ${mainElementSelector} path,
          ${mainElementSelector} rect,
          ${mainElementSelector} circle,
          ${mainElementSelector} polygon
        `).forEach(el => {
          if (!el.style.fill) {
            el.style.fill = color;
          }
        });
        clearInterval(this.intervalCheckElement);
      }
    }, 1);
  }
}

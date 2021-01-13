import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'koala-icon',
  templateUrl: 'icon.component.html',
  styleUrls: ['icon.component.css']
})
export class IconComponent implements OnInit {
  @Input() color: string;
  @Input() icon: 'notFound'|'notAllowed'|'sessionExpired'|'empty'|'excel'|'edit'|'trash';
  @Input() size: number = 24;

  ngOnInit() {
    setTimeout(() => {
      const elSvgIcon = document.querySelector(`svg#koala-icons.${this.icon}`) as SVGElement;
      elSvgIcon.style.width = `${this.size}px`;
      elSvgIcon.style.height = `${this.size}px`;
      document.querySelectorAll(`
        #koala-icons path,
        #koala-icons rect,
        #koala-icons circle,
        #koala-icons polygon
      `).forEach((el: SVGPathElement) => {
        if (!el.style.fill) {
          el.style.fill = this.color;
        }
      });
    }, 1);
  }
}

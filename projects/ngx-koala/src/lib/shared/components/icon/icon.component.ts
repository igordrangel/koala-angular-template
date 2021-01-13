import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'koala-icon',
  templateUrl: 'icon.component.html',
  styleUrls: ['icon.component.css']
})
export class IconComponent implements OnInit {
  @Input() color: string;
  @Input() icon: 'notFound'|'notAllowed'|'sessionExpired'|'empty'|'excel'|'edit'|'trash';
  @Input() size: number = 24;

  @ViewChild('svgIcon', {static: true}) private svgIconRef: ElementRef<SVGElement>;

  ngOnInit() {
    this.svgIconRef.nativeElement.style.width = `${this.size}px`;
    this.svgIconRef.nativeElement.style.height = `${this.size}px`;
    setTimeout(() => {
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

import { Component, Input, OnInit } from '@angular/core';
import { KoalaMenuModuleInterface } from './koala.menu-module.interface';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'koala-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() titleMenu: string;
  @Input() options: KoalaMenuModuleInterface[];

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.options) {
      this.router
          .events
          .subscribe(event => {
            switch (true) {
              case event instanceof NavigationEnd:
                this.options.map(module => {
                  module.active = !!module.tools.find(tool => this.router.url === tool.routerLink);
                  return module;
                });
            }
          });

    }
  }

  public toogle(module: KoalaMenuModuleInterface) {
    module.expanded = !module.expanded;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { KoalaMenuModuleInterface } from './koala.menu-module.interface';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { koala } from 'koala-utils';

export const menuStateSubject = new BehaviorSubject<'open' | 'close'>(null);

@Component({
  selector: 'koala-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() titleMenu: string;
  @Input() optionsSubject: BehaviorSubject<KoalaMenuModuleInterface[]>;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.optionsSubject) {
      this.optionsSubject.subscribe(options => {
        this.defineMenuOptions(options);
      });
      this.router
          .events
          .subscribe(event => {
            switch (true) {
              case event instanceof NavigationEnd:
                const options = this.optionsSubject.getValue();
                if (options?.length > 0) {
                  this.defineMenuOptions(options);
                }
            }
          });
    }
  }

  public toogle(module: KoalaMenuModuleInterface) {
    this.optionsSubject.next(koala(this.optionsSubject.getValue())
      .array<KoalaMenuModuleInterface>()
      .map(item => {
        if (item.name === module.name) {
          item.expanded = !module.expanded;
        } else {
          item.expanded = false;
        }
        return item;
      })
      .getValue());
  }

  private defineMenuOptions(options: KoalaMenuModuleInterface[]) {
    options.map(module => {
      module.active = module.tools ?
        (this.router.url === module.routerLink ||
          !!module.tools.find(tool => this.router.url.indexOf(tool.routerLink) >= 0)) :
        this.router.url === module.routerLink;
      return module;
    });
  }
}

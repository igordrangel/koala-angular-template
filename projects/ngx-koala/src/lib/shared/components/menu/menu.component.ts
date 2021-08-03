import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { KoalaMenuModuleInterface } from './koala.menu-module.interface';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { koala } from 'koala-utils';
import { map } from "rxjs/operators";

export const menuStateSubject = new BehaviorSubject<'open' | 'close'>(null);

@Component({
  selector: 'koala-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  @Input() titleMenu: string;
  @Input() optionsSubject: BehaviorSubject<KoalaMenuModuleInterface[]>;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.optionsSubject) {
      this.optionsSubject.pipe(map(options => this.defineMenuOptions(options))).subscribe();
      this.router
          .events
          .subscribe(event => {
            switch (true) {
              case event instanceof NavigationEnd:
                const options = JSON.parse(JSON.stringify(this.optionsSubject.getValue())) as KoalaMenuModuleInterface[];
                if (options?.length > 0) {
                  this.optionsSubject.next(this.defineMenuOptions(options, true));
                }
            }
          });
    }
  }

  public toogle(module: KoalaMenuModuleInterface) {
    const options = JSON.parse(JSON.stringify(this.optionsSubject.getValue())) as KoalaMenuModuleInterface[];
    this.optionsSubject
        .next(
          koala(options)
            .array<KoalaMenuModuleInterface>()
            .map(item => {
              if (item.name === module.name) {
                item.expanded = !module.expanded;
              } else {
                item.expanded = false;
              }
              return item;
            })
            .getValue()
        );
  }

  private defineMenuOptions(options: KoalaMenuModuleInterface[], routerChange = false) {
    options.map(module => {
      if (routerChange) {
        module.active = module.tools ?
                        (this.router.url === module.routerLink ||
                          !!module.tools.find(tool => this.router.url.indexOf(tool.routerLink) >= 0)) :
                        this.router.url === module.routerLink;
        module.expanded = module.active;
      }

      return module;
    });
    return options;
  }
}

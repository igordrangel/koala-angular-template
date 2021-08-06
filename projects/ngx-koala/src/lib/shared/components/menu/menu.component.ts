import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { KoalaMenuModuleInterface } from './koala.menu-module.interface';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { koala } from 'koala-utils';
import { map, switchMap } from "rxjs/operators";
import { KlDelay } from "koala-utils/dist/utils/KlDelay";

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
          .pipe(switchMap(event => new Promise(async resolve => {
            while (this.optionsSubject.getValue().length === 0) {
              await KlDelay.waitFor(300);
            }

            resolve(event);
          })))
          .pipe(map(event => {
            const options = this.cloneOptions();
            this.optionsSubject.next(options.map(option => {
              option.active = false;
              return option;
            }));

            return event;
          }))
          .subscribe(event => {
            switch (true) {
              case event instanceof Scroll:
              case event instanceof NavigationEnd:
                const options = this.cloneOptions();
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
              item.animateOpen = false;
              item.animateClose = false;
              if (item.name === module.name) {
                item.expanded = !module.expanded;
                item.animateOpen = item.expanded === true;
                item.animateClose = item.expanded === false;
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
        module.animateOpen = false;
        module.animateClose = false;
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

  private cloneOptions() {
    return JSON.parse(JSON.stringify(this.optionsSubject.getValue())) as KoalaMenuModuleInterface[];
  }
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { KoalaMenuModuleInterface } from './koala.menu-module.interface';
import { Router, Scroll } from '@angular/router';
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
            do {
              await KlDelay.waitFor(300);
            }
            while (this.optionsSubject.getValue().length === 0);

            resolve(event);
          })))
          .subscribe(event => {
            switch (true) {
              case event instanceof Scroll:
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

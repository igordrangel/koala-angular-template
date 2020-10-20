import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { KoalaMenuModuleInterface } from './koala.menu-module.interface';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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
      this.router
          .events
          .subscribe(event => {
            switch (true) {
              case event instanceof NavigationEnd:
                this.optionsSubject.subscribe(options => {
                  options.map(module => {
                    module.active = module.tools ?
                      (this.router.url === module.routerLink ||
                        !!module.tools.find(tool => this.router.url === tool.routerLink)) :
                      this.router.url === module.routerLink;
                    return module;
                  });
                });
            }
          });
    }
  }
  
  public toogle(module: KoalaMenuModuleInterface) {
    module.expanded = !module.expanded;
  }
}

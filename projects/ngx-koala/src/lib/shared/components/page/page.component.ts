import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoaderBarPageInterface } from '../loader/loader-bar-page.interface';
import { BehaviorSubject } from 'rxjs';
import { KoalaTokenService } from '../../services/token/koala.token.service';
import { KoalaLoaderService } from '../../services/loader/koala.loader.service';

@Component({
  selector: 'koala-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.css'],
  providers: [KoalaTokenService]
})
export class PageComponent implements OnInit {
  @Input() color: ThemePalette;
  @Input() logotipo: string;
  @Input() startMenuOpened = true;
  @Input() showLoaderPage: BehaviorSubject<boolean>;
  @Input() messageLoaderPage: BehaviorSubject<string>;
  @Input() defaultPage: string;
  @Input() openPages: string[];
  public logged: boolean;
  public loader: LoaderBarPageInterface;
  public username: string;
  public firstUserLetter: string;

  constructor(
    private tokenService: KoalaTokenService,
    private router: Router
  ) {
    KoalaLoaderService.getLoaderSubject().subscribe(loader => {
      if (loader) {
        this.loader = loader
      }
    });
  }

  ngOnInit() {
    this.tokenService.getTokenSubject()?.subscribe(token => {
      this.logged = !!token;
      if (this.logged) {
        this.username = this.tokenService.getUser<{ login: string }>().login;
        this.firstUserLetter = this.username.charAt(0).toUpperCase();
      }
      if (this.logged && this.defaultPage) {
        this.router.navigate([this.defaultPage]).then();
      } else {
        this.router.navigate(['login']).then();
      }
    });
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          KoalaLoaderService.create({typeLoader: "indeterminate"});
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          KoalaLoaderService.dismiss();
          if (this.logged && this.defaultPage && this.openPages?.indexOf(this.router.url) >= 0) {
            this.router.navigate([this.defaultPage]).then();
            return false;
          }
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  public logout() {
    this.tokenService.removeToken();
    this.tokenService.getTokenSubject().next(null);
  }
}

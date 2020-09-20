import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoaderBarPageInterface } from '../loader/loader-bar-page.interface';
import { BehaviorSubject } from 'rxjs';
import { KoalaTokenService } from '../../services/token/koala.token.service';
import { KoalaLoaderService } from '../../services/loader/koala.loader.service';
import { KoalaNotificationInterface } from '../notifications/koala.notification.interface';
import { KoalaUserMenuOptionsInterface } from './koala.user-menu-options.interface';
import { KoalaPagePalletColorsInterface } from './koala-page-pallet-colors.interface';

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
  @Input() notifications: BehaviorSubject<KoalaNotificationInterface[]>;
  @Input() userMenuOptions: KoalaUserMenuOptionsInterface[] = [];
  @Input() palletColors: KoalaPagePalletColorsInterface = {
    userPresentationBackground: '#fff',
    firstColor: '#fff',
    secondColor: '#F1F1F1',
    bodyBackground: '#eee',
    fontColor: '#1976D2',
    fontHoverColor: '#1976D2',
    fontActiveColor: '#1565C0',
    menuTitleBackground: 'rgba(0,0,0,.1)',
    menuTitleColor: 'rgba(0,0,0,.3)',
    menuBackground: '#fafafa',
    menuOptionsBackground: '#A5A5A5',
    menuOptionsColor: '#1976D2',
    menuOptionsColorHover: '#1976D2',
    menuOptionsColorActive: '#1565C0',
    listBackground: '#fff',
    listItemHover: '#F1F1F1',
    listItemActive: '#EEE',
    shadowColorTableList: 'rgba(25, 118, 210, .4)'
  };
  @Output() deleteAllNotifications = new EventEmitter<boolean>(false);
  @Output() deleteNotification = new EventEmitter<KoalaNotificationInterface>(null);
  public logged: boolean;
  public loader: LoaderBarPageInterface;
  public username: string;
  public firstUserLetter: string;
  public currentUrl: string;
  
  constructor(
    private tokenService: KoalaTokenService,
    private router: Router,
    private loaderService: KoalaLoaderService
  ) {
    this.openPages ?
      this.openPages.push('login') :
      this.openPages = ['login'];
    loaderService.getLoaderSubject().subscribe(loader => {
      if (loader) {
        this.loader = loader;
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
      if (this.logged && this.openPages?.indexOf(this.currentUrl) >= 0 && this.defaultPage) {
        this.router.navigate([this.defaultPage]).then();
      } else if (!this.logged && this.currentUrl && this.openPages?.indexOf(this.currentUrl) < 0) {
        this.router.navigate(['login']).then();
        return false;
      }
    });
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loaderService.create({typeLoader: 'indeterminate'});
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loaderService.dismiss();
          if (event instanceof NavigationEnd) {
            this.currentUrl = event.url.split('?')[0];
            if (this.logged && this.defaultPage && this.openPages?.indexOf(this.currentUrl) >= 0) {
              this.router.navigate([this.defaultPage]).then();
              return false;
            } else if (!this.logged && this.openPages?.indexOf(this.currentUrl) < 0) {
              this.router.navigate(['login']).then();
              return false;
            }
          }
          break;
        }
        default: {
          break;
        }
      }
    });
    if (this.palletColors) {
      this.defineColor();
    }
  }
  
  public logout() {
    this.tokenService.removeToken();
    this.tokenService.getTokenSubject().next(null);
  }
  
  public defineColor() {
    const css = `
body {background: ${this.palletColors.bodyBackground}!important;}
*::-webkit-scrollbar-thumb {background: ${this.palletColors.fontColor};width: 2px;}
*::-webkit-scrollbar-thumb:hover {background: ${this.palletColors.fontHoverColor};}
input:-webkit-autofill, input:-webkit-autofill:focus, input:-webkit-autofill:hover {-webkit-box-shadow: 0 0 0 1000px ${this.palletColors.firstColor} inset !important;}
.mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background,
.mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element {background-color: ${this.palletColors.fontColor} !important;}
.mat-checkbox-checkmark-path {stroke: ${this.palletColors.firstColor} !important;}
.mat-checkbox-checkmark {fill: ${this.palletColors.firstColor} !important;}
.mat-checkbox-mixedmark {background-color: ${this.palletColors.firstColor} !important;}
.mat-checkbox-frame {border-color: ${this.palletColors.fontColor} !important;}
.mat-radio-outer-circle {border-color: ${this.palletColors.fontColor}!important;}
.mat-radio-ripple .mat-ripple-element, .mat-radio-inner-circle {background-color: ${this.palletColors.fontColor} !important;}
.home-list-cards .list .mat-list-item-content .mat-icon {color: ${this.palletColors.fontColor};}
.home-list-cards .list button .mat-badge-content {background: ${this.palletColors.fontColor};}
.koala-dialog .mat-dialog-title h2 {color: ${this.palletColors.fontColor};}
.koala-dialog .mat-dialog-title mat-icon {color: ${this.palletColors.fontColor}!important;}
.koala-dialog .mat-dialog-container {background: ${this.palletColors.firstColor}}
koala-page .menu-options {background: ${this.palletColors.menuBackground};}
koala-page .menu-container,
koala-page .toolbar {background: ${this.palletColors.firstColor};}
koala-page .toolbar .btn-collapse-menu,
koala-page .btn-toolbar span{color: ${this.palletColors.fontColor};}
koala-page .btn-toolbar span.icon-user,
.user-presentation span.icon-user {background: ${this.palletColors.fontColor};color: ${this.palletColors.firstColor};}
.user-presentation {background: ${this.palletColors.userPresentationBackground};}
.user-presentation span.username {color: ${this.palletColors.fontColor};}
koala-menu .title {background: ${this.palletColors.menuTitleBackground};color: ${this.palletColors.menuTitleColor};}
koala-menu ul li:hover {color: ${this.palletColors.menuOptionsColorHover} !important;}
koala-menu ul li.active {color: ${this.palletColors.menuOptionsColorActive} !important;border-left: 4px solid ${this.palletColors.menuOptionsColorActive} !important;background: ${this.palletColors.menuOptionsBackground} !important;}
koala-menu ul li li:hover {color: ${this.palletColors.menuOptionsColorHover} !important;}
koala-menu ul li li.active {color: ${this.palletColors.menuOptionsColorActive} !important;}
.folder-list h1 mat-icon {color: ${this.palletColors.fontColor};}
.list-container {box-shadow: 0 1px 3px ${this.palletColors.shadowColorTableList};}
.list-container .list table.table-hover tr:hover {background: ${this.palletColors.listItemHover};}
.list-container .list table.table-hover tr:active {background: ${this.palletColors.listItemActive};}
.list-container .list-filter {background: ${this.palletColors.firstColor};color: ${this.palletColors.fontColor};}
.list-container .list-filter mat-icon {color: ${this.palletColors.fontColor};}
.mat-form-field-label,
.mat-form-field-appearance-outline .mat-form-field-outline,
.mat-form-field.mat-focused .mat-form-field-label {color: ${this.palletColors.fontColor};}
.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {color: ${this.palletColors.fontActiveColor};}
.mat-input-element {caret-color: ${this.palletColors.fontColor};color: ${this.palletColors.fontColor}!important;}
.list-container .list-filter .advanced {border-top: 1px solid ${this.palletColors.fontColor};background: ${this.palletColors.firstColor};}
.list-container nav.menu-list {background: ${this.palletColors.firstColor};color: rgba(25, 118, 210, .3);}
mat-paginator {color: ${this.palletColors.fontColor}!important;}
mat-paginator .mat-button-disabled {color: ${this.palletColors.menuTitleColor}!important}
.mat-select-value,
.mat-select-arrow {color: ${this.palletColors.fontColor}!important;}
.mat-form-field-underline {background-color: ${this.palletColors.fontColor}!important;}
.mat-form-field.mat-focused .mat-form-field-ripple {background-color: ${this.palletColors.fontActiveColor}!important;}
.content {background: ${this.palletColors.secondColor};}
.mat-table {background: ${this.palletColors.listBackground};color: ${this.palletColors.fontColor};}
.mat-table th {color: ${this.palletColors.fontColor}!important;}
.mat-sort-header-arrow {color: ${this.palletColors.fontColor}!important;}
.mat-table td {color: ${this.palletColors.fontColor}!important;}`;
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));
  }
}

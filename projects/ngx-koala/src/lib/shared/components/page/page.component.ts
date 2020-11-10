import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoaderBarPageInterface } from '../loader/loader-bar-page.interface';
import { BehaviorSubject } from 'rxjs';
import { KoalaTokenService } from '../../services/token/koala.token.service';
import { KoalaLoaderService } from '../../services/loader/koala.loader.service';
import { KoalaNotificationInterface } from '../notifications/koala.notification.interface';
import { KoalaUserMenuOptionsInterface } from './koala.user-menu-options.interface';
import { KoalaPagePalletColorsInterface } from './koala-page-pallet-colors.interface';
import { MatDrawer } from '@angular/material/sidenav';
import { KoalaMenuService } from '../../services/menu/koala.menu.service';
import { menuStateSubject } from '../menu/menu.component';

@Component({
  selector: 'koala-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.css'],
  providers: [KoalaTokenService],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  @Input() palletColors: KoalaPagePalletColorsInterface;
  @Output() deleteAllNotifications = new EventEmitter<boolean>(false);
  @Output() deleteNotification = new EventEmitter<KoalaNotificationInterface>(null);
  public logged: boolean;
  public loaderSubject: BehaviorSubject<LoaderBarPageInterface>;
  public username: string;
  public firstUserLetter: string;
  public currentUrl: string;
  private defaultPalletColors: KoalaPagePalletColorsInterface = {
    scrollbarColor: '#1976D2',
    scrollbarColorHover: '#1565C0',
    userPresentationBackground: '#f1f1f1',
    userPresentationUserBackground: '#1976D2',
    userPresentationUserFontColor: '#fff',
    firstColor: '#fff',
    secondColor: '#F1F1F1',
    bodyBackground: '#eeeeee',
    checkboxBackground: '#1976d2',
    checkboxColor: '#ffffff',
    fontColor: '#1976D2',
    fontHoverColor: '#1976D2',
    fontActiveColor: '#1565C0',
    menuTitleBackground: 'rgba(0,0,0,.1)',
    menuTitleColor: 'rgba(0,0,0,.3)',
    menuBackground: '#fafafa',
    menuOptionsBackground: '#eaeaea',
    menuOptionsColor: '#a5a5a5',
    menuOptionsColorHover: '#1976D2',
    menuOptionsColorActive: '#1565c0',
    toolbarBackground: '#ffffff',
    toolbarColor: '#1976d2',
    listBackground: '#fff',
    listContentBackground: '#fff',
    listTitleItemColor: '#838383',
    listItemColor: '#3e3e3e',
    listItemBackgroudHover: '#F1F1F1',
    listItemBackgroundActive: '#EEE',
    shadowColorTableList: 'rgba(25, 118, 210, .4)'
  };
  
  @ViewChild('drawer', {static: true}) private menu: MatDrawer;
  
  constructor(
    private tokenService: KoalaTokenService,
    private router: Router,
    private loaderService: KoalaLoaderService,
    private menuService: KoalaMenuService
  ) {
    this.loaderSubject = loaderService.getLoaderSubject();
  }

  ngOnInit() {
    if (this.openPages) {
      if (this.openPages.indexOf('/') < 0) {
        this.openPages.push('/');
      }
      if (this.openPages.indexOf('/login') < 0) {
        this.openPages.push('/login');
      }
    } else {
      this.openPages = [
        '/',
        '/login'
      ];
    }
    this.tokenService.getTokenSubject()?.subscribe(token => {
      this.logged = !!token;
      if (this.logged) {
        this.username = this.tokenService.getUser<{ login: string }>().login;
        this.firstUserLetter = this.username.charAt(0).toUpperCase();
        this.menuService.open();
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
      Object.keys(this.defaultPalletColors).forEach(indexName => {
        if (
          !this.palletColors.hasOwnProperty(indexName) ||
          !this.palletColors[indexName]
        ) {
          this.palletColors[indexName] = this.defaultPalletColors[indexName];
        }
      });
    } else {
      this.palletColors = this.defaultPalletColors;
    }
    this.defineColor();
  
    menuStateSubject.subscribe(async (state) => {
      if (state === 'close') {
        if (this.menu.opened) {
          await this.menu.close();
        }
      } else if (state === 'open') {
        if (!this.menu.opened) {
          await this.menu.open();
        }
      }
    });
    if (this.startMenuOpened && !!this.logged) {
      this.menuService.open();
    } else {
      this.menuService.close();
    }
  }
  
  public async toogleMenu() {
    this.menuService.clearConfig();
    await this.menu.toggle();
  }
  
  public logout() {
    this.menuService.close();
    this.tokenService.removeToken();
    this.tokenService.getTokenSubject().next(null);
  }
  
  public defineColor() {
    const css = `
*::-webkit-scrollbar-thumb {background: ${this.palletColors.scrollbarColor};width: 2px;}
*::-webkit-scrollbar-thumb:hover {background: ${this.palletColors.scrollbarColorHover};}
input:-webkit-autofill, input:-webkit-autofill:focus, input:-webkit-autofill:hover {color: ${this.palletColors.fontColor}!important;}
.menu-container,
body {background: ${this.palletColors.bodyBackground}!important;}
input:-webkit-autofill, input:-webkit-autofill:focus, input:-webkit-autofill:hover {-webkit-box-shadow: 0 0 0 1000px ${this.palletColors.firstColor} inset !important;}
.mat-button-disabled,
input::placeholder,
.mat-form-field-appearance-outline .mat-form-field-outline {color: ${this.palletColors.fontColor}!important;opacity: .6;}
.mat-hint,
.mat-expansion-indicator::after,
.more-items-content .items .titleForm,
fieldset legend,
.mat-paginator-container,
.mat-form-field-flex mat-icon {color: ${this.palletColors.fontColor}!important;}
.mat-card,
.mat-expansion-panel,
.mat-select-panel,
.mat-autocomplete-panel,
.mat-menu-panel {background: ${this.palletColors.firstColor}}
.mat-selected {background-color: rgba(0,0,0,.3)!important;}
.question p,
.alert-message,
.mat-action-row,
.mat-option,
.mat-menu-item,
.mat-menu-item mat-icon {color: ${this.palletColors.fontColor}!important}
.mat-select-value,
.mat-select-arrow,
.mat-form-field input,
.mat-form-field textarea,
.mat-form-field-appearance-outline:not(.mat-form-field-invalid) .mat-form-field-outline-thick,
.mat-form-field label {color: ${this.palletColors.fontColor}!important;caret-color: ${this.palletColors.fontColor}!important;}
.mat-form-field-underline,
.mat-form-field-appearance-fill .mat-form-field-underline::before,
.mat-form-field-ripple {background: ${this.palletColors.fontColor}!important;}
.mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background,
.mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element {background-color: ${this.palletColors.checkboxBackground} !important;}
.mat-checkbox-checkmark-path {stroke: ${this.palletColors.checkboxColor} !important;}
.mat-checkbox-checkmark {fill: ${this.palletColors.checkboxColor} !important;}
.mat-checkbox-mixedmark {background-color: ${this.palletColors.checkboxColor} !important;}
.mat-checkbox-frame {border-color: ${this.palletColors.checkboxOutlineColor}!important;}
.mat-checkbox-label {color: ${this.palletColors.fontColor}!important;}
.mat-radio-outer-circle {border-color: ${this.palletColors.checkboxBackground}!important;}
.mat-radio-ripple .mat-ripple-element, .mat-radio-inner-circle {background-color: ${this.palletColors.checkboxBackground} !important;}
.home-list-cards .list .mat-list-item-content .mat-icon {color: ${this.palletColors.fontColor};}
.home-list-cards .list button .mat-badge-content {background: ${this.palletColors.fontColor};}
.koala-dialog .mat-dialog-title h2 {color: ${this.palletColors.fontColor};}
.koala-dialog .mat-dialog-title mat-icon {color: ${this.palletColors.fontColor}!important;}
.koala-dialog .mat-dialog-container {background: ${this.palletColors.firstColor}}
.list-filter mat-icon {color: ${this.palletColors.filterIconColor}!important;}
koala-page .menu-options {background: ${this.palletColors.menuBackground};}
koala-page .toolbar {background: ${this.palletColors.toolbarBackground};}
koala-page .toolbar .btn-collapse-menu,
koala-page .btn-toolbar span{color: ${this.palletColors.toolbarColor};}
koala-page .btn-toolbar span.icon-user,
.user-presentation span.icon-user {background: ${this.palletColors.userPresentationUserBackground};color: ${this.palletColors.userPresentationUserFontColor};}
.user-presentation {background: ${this.palletColors.userPresentationBackground};}
.user-presentation span.username {color: ${this.palletColors.toolbarColor};}
koala-menu .title {background: ${this.palletColors.menuTitleBackground};color: ${this.palletColors.menuTitleColor};}
koala-menu ul li {color: ${this.palletColors.menuOptionsColor};}
koala-menu ul li:hover {color: ${this.palletColors.menuOptionsColorHover} !important;}
koala-menu ul li.active,
koala-menu ul li.expanded {color: ${this.palletColors.menuOptionsColorActive} !important;border-left: 4px solid ${this.palletColors.menuOptionsColorActive} !important;background: ${this.palletColors.menuOptionsBackground} !important;}
koala-menu ul li li:hover {color: ${this.palletColors.menuOptionsColorHover} !important;}
koala-menu ul li li.active {color: ${this.palletColors.menuOptionsColorActive} !important;}
.notifications-content .title {color: ${this.palletColors.notificationTitleColor}!important;}
.notifications-content .empty,
.notifications-content .titleList {color: ${this.palletColors.notificationContentTitleColor}!important;}
.notifications-content .iconList {color: ${this.palletColors.notificationContentIconColor}!important;}
.notifications-content .textList {color: ${this.palletColors.notificationTitleColor}!important;}
.list-container {box-shadow: 0 1px 3px ${this.palletColors.shadowColorTableList};}
.list-container .list table.table-hover tr:hover {background: ${this.palletColors.listItemBackgroudHover};}
.list-container .list table.table-hover tr:active {background: ${this.palletColors.listItemBackgroundActive};}
.list-container .list-filter .advanced {background: ${this.palletColors.firstColor};}
.list-container nav.menu-list {background: ${this.palletColors.firstColor};color: rgba(25, 118, 210, .3);}
.content {background: ${this.palletColors.listContentBackground};}
.mat-table {background: ${this.palletColors.listBackground};color: ${this.palletColors.fontColor};}
.mat-table th {color: ${this.palletColors.listTitleItemColor}!important;}
.mat-sort-header-arrow {color: ${this.palletColors.listItemColor}!important;}
.mat-table td {color: ${this.palletColors.listItemColor}!important;}`;
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));
  }
}

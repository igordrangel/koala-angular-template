import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoaderBarPageInterface } from '../loader/loader-bar-page.interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { KoalaTokenService } from '../services/token/koala.token.service';
import { KoalaLoaderService } from '../services/loader/koala.loader.service';
import { KoalaNotificationInterface } from './notifications/koala.notification.interface';
import { KoalaUserMenuOptionsInterface } from './koala.user-menu-options.interface';
import { KoalaPagePalletColorsInterface } from './koala-page-pallet-colors.interface';
import { MatDrawer } from '@angular/material/sidenav';
import { KoalaMenuService, menuStateSubject } from '@koalarx/ui/menu';
import jwtEncode from "jwt-encode";
import { TokenFactory } from "../services/token/token.factory";
import { KoalaOAuth2Service } from "../services/openid/koala.oauth2.service";
import { KoalaEnvironment } from "../environments/koalaEnvironment";
import { KoalaOauthConfig } from "../services/openid/koala.oauth.config";
import { KoalaOauth2ConfigInterface } from "../services/openid/koala-oauth2-config.interface";
import { KoalaLanguageHelper, KoalaLanguageType } from "./koala-language.helper";
import { DeviceDetectorService } from "ngx-device-detector";

@Component({
  selector: 'koala-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.css'],
  providers: [KoalaTokenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {
  @Input() showMenu: boolean = true;
  @Input() color: ThemePalette;
  @Input() logo: string;
  @Input() startMenuOpened = true;
  @Input() showLoaderPage: BehaviorSubject<boolean>;
  @Input() messageLoaderPage: BehaviorSubject<string>;
  @Input() defaultPage: string;
  @Input() openPages: string[];
  @Input() notifications: BehaviorSubject<KoalaNotificationInterface[]>;
  @Input() userMenuOptions: KoalaUserMenuOptionsInterface[] = [];
  @Input() palletColors: KoalaPagePalletColorsInterface;
  @Input() language: KoalaLanguageType = 'ptBr';
  @Output() validatingScope = new EventEmitter<boolean>(false);
  @Output() logoutEmitter = new EventEmitter<boolean>(false);
  @Output() deleteAllNotifications = new EventEmitter<boolean>(false);
  @Output() deleteNotification = new EventEmitter<KoalaNotificationInterface>(null);

  public loaderSubject: BehaviorSubject<LoaderBarPageInterface>;
  public username$ = new BehaviorSubject<string>('');
  public firstUserLetter$ = new BehaviorSubject<string>('');
  public currentUrl: string;
  public logged$ = new BehaviorSubject<boolean>(false);
  public validationScope$ = new BehaviorSubject<boolean>(false);
  public isMobile: boolean = this.deviceService.isMobile();

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
  private oauthEventsSubscription: Subscription;

  @ViewChild('drawer', {static: true}) private menu: MatDrawer;

  constructor(
    private tokenService: KoalaTokenService,
    private router: Router,
    private loaderService: KoalaLoaderService,
    private menuService: KoalaMenuService,
    private oauth2Service: KoalaOAuth2Service,
    private deviceService: DeviceDetectorService,
  ) {
    this.loaderSubject = loaderService.getLoaderSubject();
  }

  ngOnInit() {
    KoalaLanguageHelper.setLanguage(this.language);
    this.initOAuth2();
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

    this.tokenService.getToken()?.subscribe(token => {
      this.logged$.next(!!token);
      if (this.logged$.getValue()) {
        const decodedToken = this.tokenService.getDecodedToken<{ login: string }>();
        this.username$.next(decodedToken.login);
        this.firstUserLetter$.next(decodedToken.login.charAt(0).toUpperCase());
        if (!this.isMobile) {
          this.menuService.open();
        }
      }
      if (this.logged$.getValue() && this.openPages?.indexOf(this.currentUrl) >= 0 && this.defaultPage) {
        this.router.navigate([this.defaultPage]).then();
      } else if (!this.logged$.getValue() && this.currentUrl && this.openPages?.indexOf(this.currentUrl) < 0) {
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
            if (this.isMobile) {
              this.menuService.close();
            }

            this.currentUrl = event.url.split('?')[0];

            if (event.url.indexOf('/login?clientId=') < 0) {
              if (this.logged$.getValue() && this.defaultPage && this.openPages?.indexOf(this.currentUrl) >= 0) {
                this.router.navigate([this.defaultPage]).then();
                return false;
              } else if (!this.logged$.getValue() && this.openPages?.indexOf(this.currentUrl) < 0) {
                this.router.navigate(['login']).then();
                return false;
              }
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

    if (this.showMenu) {
      menuStateSubject.subscribe(async (state) => {
        if (this.menu) {
          if (state === 'close') {
            if (this.menu.opened) {
              await this.menu.close();
            }
          } else if (state === 'open') {
            if (!this.menu.opened) {
              await this.menu.open();
            }
          }
        }
      });
      if (this.startMenuOpened && this.logged$.getValue()) {
        if (!this.isMobile) {
          this.menuService.open();
        }
      } else {
        this.menuService.close();
      }
    } else {
      this.menuService.close();
    }

    this.validationScope$.subscribe(scope => this.validatingScope.emit(scope));
  }

  public async toogleMenu() {
    this.menuService.clearConfig();
    if (this.menu) {
      await this.menu.toggle();
    }
  }

  public async logout() {
    if (KoalaEnvironment.environment?.oauthConfig) {
      this.oauth2Service.logout();
    }
    this.menuService.close();
    this.tokenService.removeToken();
    this.tokenService.getToken().next(null);
    this.logoutEmitter.emit(true);
  }

  public defineColor() {
    const css = `
*::-webkit-scrollbar-thumb {background: ${this.palletColors.scrollbarColor};width: 2px;}
*::-webkit-scrollbar-thumb:hover {background: ${this.palletColors.scrollbarColorHover};}
input:-webkit-autofill, input:-webkit-autofill:focus, input:-webkit-autofill:hover {color: ${this.palletColors.fontColor}!important;}
.menu-container,
body {background: ${this.palletColors.bodyBackground}!important;}
input:-webkit-autofill, input:-webkit-autofill:focus, input:-webkit-autofill:hover {-webkit-box-shadow: 0 0 0 1000px ${this.palletColors.firstColor} inset !important;}
.mat-mdc-button-disabled,
input::placeholder,
.mat-mdc-form-field-appearance-outline .mat-mdc-form-field-outline {color: ${this.palletColors.fontColor}!important;opacity: .6;}
.mat-mdc-form-field-hint-wrapper,
.mat-expansion-indicator::after,
.more-items-content .items .titleForm,
fieldset legend,
.mat-mdc-paginator-container,
.mat-mdc-form-field-flex mat-icon,
.mat-mdc-menu-item .mdc-list-item__primary-text,
button:disabled,
.mat-mdc-paginator-range-actions button {color: ${this.palletColors.fontColor}!important;}
.mat-mdc-paginator-range-actions button svg {fill: ${this.palletColors.fontColor}!important;}
.mat-mdc-paginator-container,
.mat-mdc-card,
.mat-expansion-panel,
.mat-mdc-select-panel,
.mat-mdc-autocomplete-panel,
.mat-mdc-menu-panel {background: ${this.palletColors.firstColor}}
.mat-mdc-selected {background-color: rgba(0,0,0,.3)!important;}
input:-webkit-autofill,
input:-webkit-autofill:focus,
input:-webkit-autofill:hover {-webkit-box-shadow: 0 0 0 1000px ${this.palletColors.fontColor} inset !important;}
.mat-mdc-progress-spinner circle {stroke: ${this.palletColors.fontColor};}
.question p,
.alert-message,
.mat-mdc-action-row,
.mat-mdc-option .mdc-list-item__primary-text,
.mat-mdc-menu-item,
.mat-mdc-menu-item mat-icon {color: ${this.palletColors.fontColor}!important}
.mdc-notched-outline div {border-color: ${this.palletColors.fontColor}!important;}
.mat-mdc-select-value,
.mat-mdc-select-arrow,
.mat-mdc-form-field input,
.mat-mdc-form-field textarea,
.mat-mdc-form-field-appearance-outline:not(.mat-mdc-form-field-invalid) .mat-mdc-form-field-outline-thick,
.mat-mdc-form-field label,
.select-multiple-native select {color: ${this.palletColors.fontColor}!important;caret-color: ${this.palletColors.fontColor}!important;}
.mat-mdc-form-field-underline,
.mat-mdc-form-field-appearance-fill .mat-mdc-form-field-underline::before,
.mat-mdc-form-field-ripple {background: ${this.palletColors.fontColor}!important;}
.mat-mdc-checkbox .mdc-form-field {color: ${this.palletColors.fontColor}!important;}
.mat-mdc-checkbox-checked.mat-accent .mat-mdc-checkbox-background, .mat-mdc-checkbox-indeterminate.mat-accent .mat-mdc-checkbox-background,
.mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background {background-color: ${this.palletColors.checkboxBackground} !important;border-color: ${this.palletColors.checkboxOutlineColor}!important;}
.mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__checkmark {color: ${this.palletColors.checkboxColor} !important;}
.mat-mdc-checkbox.mat-accent .mdc-checkbox--selected~.mdc-checkbox__ripple, .mat-mdc-checkbox.mat-accent .mdc-checkbox--selected~.mdc-checkbox__ripple div {background-color: ${this.palletColors.checkboxBackground} !important;}
.mat-mdc-checkbox-checkmark {fill: ${this.palletColors.checkboxColor} !important;}
.mat-mdc-checkbox-mixedmark {background-color: ${this.palletColors.checkboxColor} !important;}
.mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background {border-color: ${this.palletColors.checkboxOutlineColor}!important;}
.mat-mdc-radio-button .mdc-form-field {color: ${this.palletColors.fontColor}!important;}
.mat-mdc-radio-button .mdc-radio__outer-circle,
.mat-mdc-radio-button .mdc-radio__inner-circle {border-color: ${this.palletColors.checkboxBackground}!important;}
.mat-mdc-radio-ripple .mat-ripple-element, .mat-mdc-radio-button .mdc-radio__background::before, .mat-mdc-radio-button.mat-mdc-radio-checked .mat-ripple-element {background-color: ${this.palletColors.checkboxBackground} !important;}
.home-list-cards .list .mat-mdc-list-item-content .mat-mdc-icon {color: ${this.palletColors.fontColor};}
.home-list-cards .list button .mat-mdc-badge-content {background: ${this.palletColors.fontColor};}
.koala-dialog .mat-mdc-dialog-title h2 {color: ${this.palletColors.fontColor};}
.koala-dialog .mat-mdc-dialog-title mat-icon {color: ${this.palletColors.fontColor}!important;}
.koala-dialog .mat-mdc-dialog-surface {background-color: ${this.palletColors.firstColor}!important;}
.list-filter mat-icon {color: ${this.palletColors.filterIconColor}!important;}
koala-page .menu-options {background: ${this.palletColors.menuBackground};}
koala-page .toolbar {background: ${this.palletColors.toolbarBackground};}
koala-page .toolbar .btn-collapse-menu,
koala-page .btn-toolbar span{color: ${this.palletColors.toolbarColor};}
koala-page .btn-toolbar span.icon-user,
.user-presentation span.icon-user {background: ${this.palletColors.userPresentationUserBackground};color: ${this.palletColors.userPresentationUserFontColor};}
.user-presentation {background: ${this.palletColors.userPresentationBackground};}
.user-presentation span.username {color: ${this.palletColors.toolbarColor};}
.mat-drawer.mat-drawer-push {background-color: ${this.palletColors.bodyBackground};}
koala-menu .title {background: ${this.palletColors.menuTitleBackground};color: ${this.palletColors.menuTitleColor};}
koala-menu ul li,
koala-menu ul li a {color: ${this.palletColors.menuOptionsColor};}
koala-menu ul li:hover,
koala-menu ul li:hover a {color: ${this.palletColors.menuOptionsColorHover} !important;}
koala-menu ul li.active,
koala-menu ul li.expanded {color: ${this.palletColors.menuOptionsColorActive} !important;border-left: 4px solid ${this.palletColors.menuOptionsColorActive} !important;background: ${this.palletColors.menuOptionsBackground} !important;}
koala-menu ul li.active a,
koala-menu ul li.expanded a {color: ${this.palletColors.menuOptionsColorActive} !important;background: ${this.palletColors.menuOptionsBackground} !important;}
koala-menu ul li li:hover,
koala-menu ul li li:hover a {color: ${this.palletColors.menuOptionsColorHover} !important;}
koala-menu ul li li.active,
koala-menu ul li li.active a {color: ${this.palletColors.menuOptionsColorActive} !important;}
koala-menu ul li koala-icon svg *,
koala-menu ul li a koala-icon svg * {fill: ${this.palletColors.menuOptionsColor};}
koala-menu ul li:hover koala-icon svg *,
koala-menu ul li:hover a koala-icon svg * {fill: ${this.palletColors.menuOptionsColorHover} !important;}
koala-menu ul li.active koala-icon *,
koala-menu ul li.expanded koala-icon * {fill: ${this.palletColors.menuOptionsColorActive} !important;}
koala-menu ul li li:hover koala-icon *,
koala-menu ul li li:hover a koala-icon * {fill: ${this.palletColors.menuOptionsColorHover} !important;}
koala-menu ul li li.active koala-icon *,
koala-menu ul li li.active a koala-icon * {fill: ${this.palletColors.menuOptionsColorActive}!important;}
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
.mat-tab-group .mat-tab-label {color: ${this.palletColors.fontColor};}
.mat-tab-group .mat-ink-bar {background-color: ${this.palletColors.fontColor}!important;}
.mat-mdc-table {background: ${this.palletColors.listBackground};color: ${this.palletColors.fontColor};}
.mat-mdc-table th {color: ${this.palletColors.listTitleItemColor}!important;}
.mat-mdc-sort-header-arrow {color: ${this.palletColors.listItemColor}!important;}
.mat-mdc-table td {color: ${this.palletColors.listItemColor}!important;}`;
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));
  }

  private initOAuth2() {
    KoalaOauthConfig.config.subscribe(config => this.startConfig(config));
    if (KoalaOauthConfig.hasConfig()) {
      KoalaOauthConfig.setConfig(KoalaOauthConfig.getConfig());
    }
  }

  private startConfig(config: KoalaOauth2ConfigInterface) {
    if (config.clientId) {
      this.oauth2Service.configure({
        redirectUri: window.location.origin,
        redirectUriAfterAuth: this.defaultPage,
        responseType: 'code',
        clientId: config.clientId,
        scope: config.scope,
        issuer: config.domain,
        customQueryParams: config.customQueryParams,
        endpointToken: config.endpointToken ?? null,
        endpointClaims: config.endpointClaims ?? null
      });
      this.oauth2Service.loadDiscoveryDocumentAndTryLogin().then();

      if (this.oauthEventsSubscription) {
        this.oauthEventsSubscription.unsubscribe();
      }
      this.oauthEventsSubscription = this.oauth2Service.events.subscribe(event => {
        if (event === 'userAuthenticated' || event === 'refreshToken') {
          const claims = this.oauth2Service.getIdentityClaims();
          if (claims && (
            !TokenFactory.hasToken() ||
            (TokenFactory.hasToken() && event === 'refreshToken')
          )) {
            this.tokenService.setToken(jwtEncode({
              accessToken: this.oauth2Service.getAccessToken(),
              idToken: this.oauth2Service.getIdToken(),
              refreshToken: this.oauth2Service.getRefreshToken(),
              login: claims[config.indexLoginName] ?? 'Undefined',
              expired: this.oauth2Service.getAccessTokenExpiration(),
              code: this.oauth2Service.getCode()
            }, 'secret'))
          }

          if (event === 'userAuthenticated') {
            setTimeout(() => this.validationScope$.next(false), 300);
          }
        } else if (event === 'getToken') {
          this.validationScope$.next(true);
        }
      });
    }
  }
}

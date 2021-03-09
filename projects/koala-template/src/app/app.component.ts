import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KoalaPagePalletColorsInterface } from '../../../ngx-koala/src/lib/shared/components/page/koala-page-pallet-colors.interface';
import { KoalaTheme } from "./shared/helpers/theme";
import { KoalaOauth2ConfigInterface } from "../../../ngx-koala/src/lib/shared/components/page/koala-oauth2-config.interface";

declare namespace NodeJS {
  interface TypedArray {

  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public openPages = ['/login'];
  public palletCollors: KoalaPagePalletColorsInterface = KoalaTheme;
  public oauth2Config: KoalaOauth2ConfigInterface = {
    customQueryParams: {
      client_secret: 't1gbmEgh4EUgAJRLy16Zjrks'
    },
    clientId: '679440572859-iviegii370t3n4m15qrpr4fpj4db8jc7.apps.googleusercontent.com',
    scope: 'openid profile email',
    domain: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    indexLoginName: 'name'
  }
}

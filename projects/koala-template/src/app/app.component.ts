import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KoalaPagePalletColorsInterface } from '../../../ngx-koala/src/lib/shared/components/page/koala-page-pallet-colors.interface';
import {KoalaTheme} from "./shared/helpers/theme";
import { KoalaOauth2ConfigInterface } from "../../../ngx-koala/src/lib/shared/components/page/koala-oauth2-config.interface";

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
    clientId: '0oa40cp7kvadipTQO5d6',
    scope: 'openid profile email',
    domain: 'https://dev-5633813.okta.com/oauth2/default',
    indexLoginName: 'name'
  }
}

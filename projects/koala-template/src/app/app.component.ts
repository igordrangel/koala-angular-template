import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KoalaPagePalletColorsInterface } from '../../../ngx-koala/src/lib/shared/components/page/koala-page-pallet-colors.interface';
import {KoalaTheme} from "./shared/helpers/theme";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public openPages = ['/login'];
  public palletCollors: KoalaPagePalletColorsInterface = KoalaTheme;
}

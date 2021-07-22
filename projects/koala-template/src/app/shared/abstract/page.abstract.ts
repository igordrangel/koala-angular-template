import { NavigateHelper } from '../helpers/navigate.helper';
import { KoalaThemeColors } from "../helpers/theme";

export abstract class PageAbstract {
  public navigationHistory = NavigateHelper.navigationHistory();
  public folderBackground = KoalaThemeColors.backgroundSpotlight;
}

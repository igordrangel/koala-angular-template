import { NavigateHelper } from '../helpers/navigate.helper';

export abstract class PageAbstract {
  public navigationHistory = NavigateHelper.navigationHistory();
}

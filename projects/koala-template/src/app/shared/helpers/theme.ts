import {KoalaPagePalletColorsInterface} from "../../../../../ngx-koala/src/lib/shared/components/page/koala-page-pallet-colors.interface";

export const KoalaThemeColors = {
  primary: '#36044c',
  secondary: '#39064f'
};

export const KoalaTheme:KoalaPagePalletColorsInterface = {
  userPresentationUserFontColor: '#36044c',
  userPresentationUserBackground: '#fff',
  userPresentationBackground: KoalaThemeColors.primary,
  userPresentationButtonColor: KoalaThemeColors.primary,
  toolbarBackground: KoalaThemeColors.secondary,
  toolbarColor: '#fff',
  menuBackground: KoalaThemeColors.secondary,
  menuOptionsBackground: '#2d063e',
  menuOptionsColor: 'rgba(255,255,255,0.6)',
  menuOptionsColorHover: 'rgba(255,255,255,.9)',
  menuOptionsColorActive: '#fff',
  checkboxBackground: '#fff',
  checkboxColor: KoalaThemeColors.primary,
  checkboxOutlineColor: '#fff',
  firstColor: KoalaThemeColors.primary,
  secondColor: '#303030',
  fontColor: '#fff',
  bodyBackground: KoalaThemeColors.secondary,
  notificationTitleColor: '#fff',
  notificationContentTitleColor: 'rgba(255,255,255,.8)',
  notificationContentColor: '#fff',
  notificationContentIconColor: '#fff',
  filterIconColor: '#fff',
  listItemColor: '#fff',
  listTitleItemColor: '#fafafa',
  listBackground: KoalaThemeColors.secondary,
  listItemBackgroudHover: KoalaThemeColors.secondary,
  listItemBackgroundActive: '#2d063e',
  listContentBackground: KoalaThemeColors.secondary,
  shadowColorTableList: 'rgba(255,255,255,.3)',
  scrollbarColor: 'rgba(255,255,255,0.8)',
  scrollbarColorHover: '#fff'
};

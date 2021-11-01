import { KoalaPagePalletColorsInterface } from "@koalarx/ui/core";

export const KoalaThemeColors = {
  primary: '#121212',
  secondary: '#212121',
  backgroundSpotlight: '#191919'
};

export const KoalaTheme: KoalaPagePalletColorsInterface = {
  userPresentationUserFontColor: KoalaThemeColors.secondary,
  userPresentationUserBackground: '#fff',
  userPresentationBackground: KoalaThemeColors.primary,
  userPresentationButtonColor: KoalaThemeColors.primary,
  toolbarBackground: KoalaThemeColors.primary,
  toolbarColor: '#fff',
  menuBackground: KoalaThemeColors.primary,
  menuOptionsBackground: KoalaThemeColors.backgroundSpotlight,
  menuOptionsColor: 'rgba(255,255,255,0.6)',
  menuOptionsColorHover: 'rgba(255,255,255,.8)',
  menuOptionsColorActive: '#fff',
  checkboxBackground: '#fff',
  checkboxColor: KoalaThemeColors.primary,
  checkboxOutlineColor: '#fff',
  firstColor: KoalaThemeColors.secondary,
  secondColor: '#303030',
  fontColor: '#fff',
  bodyBackground: KoalaThemeColors.primary,
  notificationTitleColor: '#fff',
  notificationContentTitleColor: 'rgba(255,255,255,.8)',
  notificationContentColor: '#fff',
  notificationContentIconColor: '#fff',
  filterIconColor: '#fff',
  listItemColor: '#fff',
  listTitleItemColor: '#fafafa',
  listBackground: KoalaThemeColors.secondary,
  listItemBackgroudHover: KoalaThemeColors.backgroundSpotlight,
  listItemBackgroundActive: '#121212',
  listContentBackground: KoalaThemeColors.secondary,
  shadowColorTableList: 'rgba(0,0,0,.6)',
  scrollbarColor: 'rgba(255,255,255,0.8)',
  scrollbarColorHover: '#fff'
};

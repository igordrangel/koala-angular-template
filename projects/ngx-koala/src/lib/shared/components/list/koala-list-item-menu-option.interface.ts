export interface KoalaListItemMenuOptionInterface {
  icon: string;
  name: string;
  action: (item: any) => void;
  havePermission: boolean;
  showByItemList?: (item: any) => boolean;
}

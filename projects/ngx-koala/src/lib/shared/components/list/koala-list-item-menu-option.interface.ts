export interface KoalaListItemMenuOptionInterface<DataType> {
  icon: string;
  name: string;
  action: (item: DataType) => void;
  havePermission: boolean;
  showByItemList?: (item: DataType) => boolean;
}

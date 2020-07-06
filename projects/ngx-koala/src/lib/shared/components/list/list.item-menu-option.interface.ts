export interface ListItemMenuOptionInterface {
  icon: string;
  name: string;
  action: (item: any) => void;
  havePermission: boolean;
}

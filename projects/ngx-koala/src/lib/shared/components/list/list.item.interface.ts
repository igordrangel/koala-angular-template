export interface ListItemInterface {
  label: string;
  columnDef: string;
  itemNameProperty: (item: any) => string;
  dblClick?: (item: any) => void;
  sortHeader?: string;
}

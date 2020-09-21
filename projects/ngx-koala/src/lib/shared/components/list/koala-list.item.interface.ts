import { KoalaListItem } from './koala-list-item';

export interface KoalaListItemInterface {
  label: string;
  columnDef: string;
  itemNameProperty?: (item: any) => string;
  itemComponent?: (item: any) => KoalaListItem;
  dblClick?: (item: any) => void;
  sortHeader?: string;
}

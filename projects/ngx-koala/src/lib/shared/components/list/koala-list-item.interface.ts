import { KoalaDynamicComponent } from '../dynamic-component/koala-dynamic-component';

export interface KoalaListItemInterface {
  label: string;
  columnDef: string;
  itemNameProperty?: (item: any) => string;
  itemComponent?: (item: any) => KoalaDynamicComponent;
  dblClick?: (item: any) => void;
  sortHeader?: string;
}

import { KoalaDynamicComponent } from '../dynamic-component/koala-dynamic-component';

export interface KoalaListItemInterface<DataType> {
  label: string;
  columnDef: string;
  itemNameProperty?: (item: DataType) => string;
  itemComponent?: (item: DataType) => KoalaDynamicComponent;
  dblClick?: (item: DataType) => void;
  sortHeader?: string;
}

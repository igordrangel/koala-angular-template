import { KoalaDynamicComponent } from '@koalarx/ui/dynamic-component';

export interface KoalaListItemInterface<DataType> {
  label: string;
  columnDef: string;
  itemNameProperty?: (item: DataType) => string;
  itemComponent?: (item: DataType) => KoalaDynamicComponent;
  dblClick?: (item: DataType) => void;
  sortHeader?: string;
}

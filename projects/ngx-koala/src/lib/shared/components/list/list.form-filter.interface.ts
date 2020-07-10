import { SortDirection } from '@angular/material/sort';

export interface ListFormFilterInterface {
  params: any;
  sort: string;
  order: SortDirection;
  page: number;
}

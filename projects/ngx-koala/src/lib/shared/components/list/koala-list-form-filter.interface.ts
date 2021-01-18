import { SortDirection } from '@angular/material/sort';

export interface KoalaListFormFilterInterface {
  params: any;
  sort: string;
  order: SortDirection;
  page: number;
  limit: number;
}

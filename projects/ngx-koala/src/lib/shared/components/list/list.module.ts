import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { KoalaFormModule } from '../form/koala.form.module';
import { MatMenuModule } from '@angular/material/menu';
import { PaginationProvider } from '../../providers/pagination/pagination.provider';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    KoalaFormModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    ListComponent
  ],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: PaginationProvider
  }]
})
export class ListModule {
}

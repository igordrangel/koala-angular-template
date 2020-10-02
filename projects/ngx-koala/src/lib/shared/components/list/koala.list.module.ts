import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { KoalaFormModule } from '../form/koala.form.module';
import { MatMenuModule } from '@angular/material/menu';
import { PaginationProvider } from '../../providers/pagination/pagination.provider';
import { KoalaFolderPageModule } from '../folder-page/koala.folder-page.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { KoalaDynamicComponentModule } from '../dynamic-component/koala-dynamic-component.module';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaFormModule,
    KoalaDynamicComponentModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
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
export class KoalaListModule {
}

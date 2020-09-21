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
import { ListItemDirective } from './list-item.directive';
import { ListItemFactory } from './list-item.factory';

@NgModule({
  declarations: [
    ListComponent,
    ListItemDirective,
    ListItemFactory
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaFormModule,
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

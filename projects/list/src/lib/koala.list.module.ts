import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { KoalaFormModule } from '@koalarx/ui/form';
import { MatMenuModule } from '@angular/material/menu';
import { PaginationProvider } from './providers/pagination/pagination.provider';
import { KoalaFolderPageModule } from '@koalarx/ui/folder-page';
import { MatTooltipModule } from '@angular/material/tooltip';
import { KoalaDynamicComponentModule } from '@koalarx/ui/dynamic-component';
import { KoalaButtonModule } from "@koalarx/ui/button";

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaFormModule,
    KoalaDynamicComponentModule,
    KoalaButtonModule,
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

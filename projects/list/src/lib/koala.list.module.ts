import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyPaginatorIntl as MatPaginatorIntl, MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { CommonModule } from '@angular/common';
import { KoalaFormModule } from '@koalarx/ui/form';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { PaginationProvider } from './providers/pagination/pagination.provider';
import { KoalaFolderPageModule } from '@koalarx/ui/folder-page';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
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

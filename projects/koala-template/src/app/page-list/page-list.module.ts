import { NgModule } from '@angular/core';
import { ListModule } from '../../../../ngx-koala/src/lib/shared/components/list/list.module';
import { PageListComponent } from './page-list.component';
import { PageListRoutingModule } from './page-list-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PageListComponent
  ],
  imports: [
    ListModule,
    MatButtonModule,
    PageListRoutingModule
  ],
  exports: []
})
export class PageListModule {

}

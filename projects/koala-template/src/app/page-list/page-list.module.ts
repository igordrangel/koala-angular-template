import { NgModule } from '@angular/core';
import { ListModule } from '../../../../ngx-koala/src/lib/shared/components/list/list.module';
import { PageListComponent } from './page-list.component';
import { PageListRoutingModule } from './page-list-routing.module';
import { KoalaButtonModule } from '../../../../ngx-koala/src/lib/shared/components/button/koala.button.module';

@NgModule({
  declarations: [
    PageListComponent
  ],
  imports: [
    ListModule,
    KoalaButtonModule,
    PageListRoutingModule
  ],
  exports: []
})
export class PageListModule {

}

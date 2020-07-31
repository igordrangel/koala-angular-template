import { NgModule } from '@angular/core';
import { ListModule } from '../../../../ngx-koala/src/lib/shared/components/list/list.module';
import { PageListComponent } from './page-list.component';
import { PageListRoutingModule } from './page-list-routing.module';
import { KoalaButtonModule } from '../../../../ngx-koala/src/lib/shared/components/button/koala.button.module';
import { KoalaDialogModule } from '../../../../ngx-koala/src/lib/shared/components/dialog/koala.dialog.module';
import { KoalaFormModule } from '../../../../ngx-koala/src/lib/shared/components/form/koala.form.module';
import { DialogPageListComponent } from './forms/insert/dialog-page-list.component';
import { KoalaQuestionModule } from '../../../../ngx-koala/src/lib/shared/components/question/koala.question.module';
import { KoalaAlertModule } from '../../../../ngx-koala/src/lib/shared/components/alert/koala.alert.module';

@NgModule({
  declarations: [
    PageListComponent,
    DialogPageListComponent
  ],
  imports: [
    ListModule,
    KoalaFormModule,
    KoalaDialogModule,
    KoalaQuestionModule,
    KoalaAlertModule,
    KoalaButtonModule,
    PageListRoutingModule
  ],
  exports: [],
  providers: []
})
export class PageListModule {

}

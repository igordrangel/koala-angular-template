import { NgModule } from '@angular/core';
import { KoalaListModule } from '../../../../ngx-koala/src/lib/shared/components/list/koala.list.module';
import { PageListComponent } from './page-list.component';
import { PageListRoutingModule } from './page-list-routing.module';
import { KoalaButtonModule } from '../../../../ngx-koala/src/lib/shared/components/button/koala.button.module';
import { KoalaDialogModule } from '../../../../ngx-koala/src/lib/shared/components/dialog/koala.dialog.module';
import { KoalaDialogService } from '../../../../ngx-koala/src/lib/shared/services/dialog/koala.dialog.service';
import { KoalaFormModule } from '../../../../ngx-koala/src/lib/shared/components/form/koala.form.module';
import { DialogPageListComponent } from './forms/insert/dialog-page-list.component';
import { KoalaQuestionModule } from '../../../../ngx-koala/src/lib/shared/components/question/koala.question.module';
import { KoalaQuestionService } from '../../../../ngx-koala/src/lib/shared/services/question/koala.question.service';
import { KoalaAlertService } from '../../../../ngx-koala/src/lib/shared/services/alert/koala.alert.service';
import { KoalaAlertModule } from '../../../../ngx-koala/src/lib/shared/components/alert/koala.alert.module';
import { KoalaFolderPageModule } from '../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module';
import { CountryComponent } from './country/country-component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PageListComponent,
    CountryComponent,
    DialogPageListComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaListModule,
    KoalaFormModule,
    KoalaDialogModule,
    KoalaQuestionModule,
    KoalaAlertModule,
    KoalaButtonModule,
    PageListRoutingModule
  ],
  exports: [],
  providers: [
    KoalaDialogService,
    KoalaAlertService,
    KoalaQuestionService
  ]
})
export class PageListModule {

}

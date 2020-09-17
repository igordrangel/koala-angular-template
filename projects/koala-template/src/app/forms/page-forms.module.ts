import { NgModule } from '@angular/core';
import { PageFormsComponent } from './page-forms.component';
import { CommonModule } from '@angular/common';
import { PageFormsRoutingModule } from './page-forms-routing.module';
import { KoalaFormModule } from '../../../../ngx-koala/src/lib/shared/components/form/koala.form.module';
import { KoalaFolderPageModule } from '../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { KoalaLocationFormModule } from '../../../../ngx-koala/src/lib/shared/components/form/location-form/koala.location-form.module';

@NgModule({
  declarations: [
    PageFormsComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaFormModule,
    KoalaLocationFormModule,
    MatExpansionModule,
    PageFormsRoutingModule
  ]
})
export class PageFormsModule {
}

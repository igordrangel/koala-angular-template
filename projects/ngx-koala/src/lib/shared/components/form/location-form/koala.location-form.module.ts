import { NgModule } from '@angular/core';
import { LocationFormComponent } from './location-form.component';
import { CommonModule } from '@angular/common';
import { KoalaFormModule } from '../koala.form.module';
import { KoalaDynamicFormService } from '../../../services/dynamic-forms/koala.dynamic-form.service';

@NgModule({
  declarations: [
    LocationFormComponent
  ],
  exports: [
    LocationFormComponent
  ],
  imports: [
    CommonModule,
    KoalaFormModule
  ],
  providers: [
    KoalaDynamicFormService
  ]
})
export class KoalaLocationFormModule {
}

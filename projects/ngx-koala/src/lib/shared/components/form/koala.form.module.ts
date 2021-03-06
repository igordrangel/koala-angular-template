import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BtnSubmitComponent } from './btn-submit/btn-submit.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { maskOptions } from '../../../mask-options';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { KoalaButtonModule } from '../button/koala.button.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { KoalaAutofocusDirective } from '../../directives/koala-autofocus.directive';
import { KoalaFileButtonModule } from '../file-button/koala.file-button.module';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    BtnSubmitComponent,
    DynamicFormComponent,
    KoalaAutofocusDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot(maskOptions),
    KoalaFileButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    KoalaButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    KoalaAutofocusDirective,
    NgxMaskModule,
    KoalaFileButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BtnSubmitComponent,
    DynamicFormComponent
  ]
})
export class KoalaFormModule {
}

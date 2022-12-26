import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { BtnSubmitComponent } from './btn-submit/btn-submit.component';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { maskOptions } from '@koalarx/ui/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { KoalaButtonModule } from '@koalarx/ui/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { KoalaAutofocusDirective } from './directives/koala-autofocus.directive';
import { KoalaFileButtonModule } from '@koalarx/ui/file-button';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';

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

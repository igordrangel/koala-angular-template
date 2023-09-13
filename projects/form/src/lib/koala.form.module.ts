import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BtnSubmitComponent } from './btn-submit/btn-submit.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { maskOptions } from '@koalarx/ui/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { KoalaButtonModule } from '@koalarx/ui/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { KoalaAutofocusDirective } from './directives/koala-autofocus.directive';
import { KoalaFileButtonModule } from '@koalarx/ui/file-button';
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

@NgModule({
  declarations: [
    BtnSubmitComponent,
    DynamicFormComponent,
    KoalaAutofocusDirective
  ],
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
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
  ],
  providers: [
    provideNgxMask(maskOptions),
  ]
})
export class KoalaFormModule {
}

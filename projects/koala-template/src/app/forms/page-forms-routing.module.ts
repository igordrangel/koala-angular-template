import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageFormsComponent } from './page-forms.component';

const routes: Routes = [
  {path: '', component: PageFormsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageFormsRoutingModule {
}

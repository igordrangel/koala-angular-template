import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageDynamicFormComponent } from "./page-dynamic-form.component";

const routes: Routes = [
  {path: '', component: PageDynamicFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicFormRoutingModule {}

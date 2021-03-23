import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CrudPageExampleComponent } from "./crud-page-example.component";

const routes: Routes = [
  {path: '', component: CrudPageExampleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudPageExampleRoutingModule {}

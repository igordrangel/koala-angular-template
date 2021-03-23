import { RouterModule, Routes } from "@angular/router";
import { PageExampleCrudPageComponent } from "./page-example-crud-page.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {path: '', component: PageExampleCrudPageComponent},
  {path: 'example', loadChildren: () => import('./example/crud-page-example.module').then(m => m.CrudPageExampleModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudPageRoutingModule {}

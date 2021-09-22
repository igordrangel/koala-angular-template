import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageXlsxComponent } from "./page-xlsx.component";

const routes: Routes = [
  {path: '', component: PageXlsxComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XlsxRoutingModule {}

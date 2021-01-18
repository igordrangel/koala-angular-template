import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageBtnFileComponent } from "./page-btn-file.component";

const routes: Routes = [
  {path: '', component: PageBtnFileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BtnFileRoutingModule {}

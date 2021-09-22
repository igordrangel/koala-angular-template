import { RouterModule, Routes } from "@angular/router";
import { PageOpenidComponent } from "./page-openid.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {path: '', component: PageOpenidComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenidRoutingModule {}

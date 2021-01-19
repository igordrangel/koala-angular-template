import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageRequestComponent } from "./page-request.component";

const routes: Routes = [
  {path: '', component: PageRequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule {}

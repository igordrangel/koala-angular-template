import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageAlertComponent } from "./page-alert.component";

const routes: Routes = [
  {path: '', component: PageAlertComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertRoutingModule {}

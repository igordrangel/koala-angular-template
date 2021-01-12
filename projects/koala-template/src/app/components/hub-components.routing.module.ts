import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PageHubComponentsComponent} from "./page-hub-components.component";

const routes: Routes = [
  {path: '', component: PageHubComponentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubComponentsRoutingModule {}

import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PageHubComponentsComponent} from "./page-hub-components.component";
import { PageIconsComponent } from "./icons/page-icons.component";

const routes: Routes = [
  {path: '', component: PageHubComponentsComponent},
  {path: 'icons', component: PageIconsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubComponentsRoutingModule {}

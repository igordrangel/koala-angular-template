import { RouterModule, Routes } from "@angular/router";
import { PageHubGuidesComponent } from "./page-hub-guides.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {path: '', component: PageHubGuidesComponent},
  {path: 'crud-page', loadChildren: () => import('./crud-page/crud-page.module').then(m => m.CrudPageModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubGuidesRoutingModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageHubServicesComponent } from "./page-hub-services.component";

const routes: Routes = [
  {path: '', component: PageHubServicesComponent},
  {path: 'page-loader', loadChildren: () => import('./page-loader/page-loader.module').then(m => m.PageLoaderModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubServicesRoutingModule {}

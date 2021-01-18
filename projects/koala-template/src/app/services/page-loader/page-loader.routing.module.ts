import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagePageLoaderComponent } from "./page-page-loader.component";

const routes: Routes = [
  {path: '', component: PagePageLoaderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageLoaderRoutingModule {}

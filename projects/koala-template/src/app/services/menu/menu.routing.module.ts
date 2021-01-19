import { RouterModule, Routes } from "@angular/router";
import { PageMenuComponent } from "./page-menu.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {path: '', component: PageMenuComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}

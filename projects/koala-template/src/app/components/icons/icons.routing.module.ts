import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageIconsComponent } from "./page-icons.component";

const routes: Routes = [
  {path: '', component: PageIconsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule {}

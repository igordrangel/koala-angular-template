import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageIconsAnimatedComponent } from "./page-icons-animated.component";

const routes: Routes = [
  {path: '', component: PageIconsAnimatedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsAnimatedRoutingModule {}

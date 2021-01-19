import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageTokenComponent } from "./page-token.component";

const routes: Routes = [
  {path: '', component: PageTokenComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TokenRoutingModule {}

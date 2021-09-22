import { RouterModule, Routes } from "@angular/router";
import { PageSnackbarComponent } from "./page-snackbar.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {path: '', component: PageSnackbarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnackbarRoutingModule {}

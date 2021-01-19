import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageCsvComponent } from "./page-csv.component";

const routes: Routes = [
  {path: '', component: PageCsvComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsvRoutingModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageFolderPageComponent } from "./page-folder-page.component";

const routes: Routes = [
  {path: '', component: PageFolderPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FolderPageRoutingModule {}

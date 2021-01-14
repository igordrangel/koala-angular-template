import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PageHubComponentsComponent} from "./page-hub-components.component";

const routes: Routes = [
  {path: '', component: PageHubComponentsComponent},
  {path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)},
  {path: 'folder-page', loadChildren: () => import('./folder-page/folder-page.module').then(m => m.FolderPageModule)},
  {path: 'dialog', loadChildren: () => import('./dialog/dialog.module').then(m => m.DialogModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubComponentsRoutingModule {}

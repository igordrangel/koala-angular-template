import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PageHubComponentsComponent} from "./page-hub-components.component";

const routes: Routes = [
  {path: '', component: PageHubComponentsComponent},
  {path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)},
  {path: 'folder-page', loadChildren: () => import('./folder-page/folder-page.module').then(m => m.FolderPageModule)},
  {path: 'dialog', loadChildren: () => import('./dialog/dialog.module').then(m => m.DialogModule)},
  {path: 'button', loadChildren: () => import('./button/button.module').then(m => m.ButtonModule)},
  {path: 'alert', loadChildren: () => import('./alert/alert.module').then(m => m.AlertModule)},
  {path: 'question', loadChildren: () => import('./question/question.module').then(m => m.QuestionModule)},
  {path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubComponentsRoutingModule {}

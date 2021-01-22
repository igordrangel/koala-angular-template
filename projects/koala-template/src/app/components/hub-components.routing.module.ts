import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PageHubComponentsComponent} from "./page-hub-components.component";

const routes: Routes = [
  {path: '', component: PageHubComponentsComponent},
  {path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)},
  {path: 'icons-animated', loadChildren: () => import('./icons-animated/icons-animated.module').then(m => m.IconsAnimatedModule)},
  {path: 'folder-page', loadChildren: () => import('./folder-page/folder-page.module').then(m => m.FolderPageModule)},
  {path: 'dialog', loadChildren: () => import('./dialog/dialog.module').then(m => m.DialogModule)},
  {path: 'button', loadChildren: () => import('./button/button.module').then(m => m.ButtonModule)},
  {path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule)},
  {path: 'file-button', loadChildren: () => import('./button-file/btn-file.module').then(m => m.BtnFileModule)},
  {path: 'dynamic-form', loadChildren: () => import('./dynamic-form/dynamic-form.module').then(m => m.DynamicFormModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubComponentsRoutingModule {}

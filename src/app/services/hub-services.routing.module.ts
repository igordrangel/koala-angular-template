import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {path: 'page-loading', loadChildren: () => import('./page-loader/page-loader.module').then(m => m.PageLoaderModule)},
  {path: 'xlsx', loadChildren: () => import('./xlsx/xlsx.module').then(m => m.XlsxModule)},
  {path: 'csv', loadChildren: () => import('./csv/csv.module').then(m => m.CsvModule)},
  {path: 'alert', loadChildren: () => import('./alert/alert.module').then(m => m.AlertModule)},
  {path: 'question', loadChildren: () => import('./question/question.module').then(m => m.QuestionModule)},
  {path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)},
  {path: 'request', loadChildren: () => import('./request/request.module').then(m => m.RequestModule)},
  {path: 'token', loadChildren: () => import('./token/token.module').then(m => m.TokenModule)},
  {path: 'oauth2', loadChildren: () => import('./openid/openid.module').then(m => m.OpenidModule)},
  {path: 'snackbar', loadChildren: () => import('./snackbar/snackbar.module').then(m => m.SnackbarModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubServicesRoutingModule {}

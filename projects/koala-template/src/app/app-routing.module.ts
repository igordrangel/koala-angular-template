import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './login/page-login.component';

const routes: Routes = [
  {path: 'login', component: PageLoginComponent},
  {path: 'list', loadChildren: () => import('./page-list/page-list.module').then(m => m.PageListModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

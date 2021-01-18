import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './login/page-login.component';
import {PageGetStartedComponent} from "./get-started/page-get-started.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', component: PageLoginComponent},
  {path: 'get-started', component: PageGetStartedComponent},
  {path: 'components', loadChildren: () => import('./components/hub-components.module').then(m => m.HubComponentsModule)},
  {path: 'services', loadChildren: () => import('./services/hub-services.module').then(m => m.HubServicesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

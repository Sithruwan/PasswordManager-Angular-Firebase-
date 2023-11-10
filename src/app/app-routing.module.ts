import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SiteListComponent} from "./site-list/site-list.component";
import {PasswordListComponent} from "./password-list/password-list.component";
import {NotFoundPageComponent} from "./not-found-page/not-found-page.component";
import {authGuardGuard} from "./guards/auth-guard.guard";

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'login', component: LoginComponent },
  {path:'site-list', component: SiteListComponent,canActivate:[authGuardGuard]},
  {path:'password-list', component: PasswordListComponent,canActivate:[authGuardGuard]},
  {path:'**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

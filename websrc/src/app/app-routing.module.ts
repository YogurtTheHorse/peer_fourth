import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HelloComponent} from './hello/hello.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MainComponent} from "./main/main.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', pathMatch: 'full', canActivate: [AuthGuard], component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

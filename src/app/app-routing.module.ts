import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Components/home/home.component";
import {RegionsComponent} from "./Components/regions/regions.component";
import { LoginComponent } from './Components/login/login/login.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'Regions',
    component: RegionsComponent
  },
  {
    path: 'Login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

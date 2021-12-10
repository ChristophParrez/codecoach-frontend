import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { RegisterUserComponent } from "./components/register-user/register-user.component";
import {LoginComponent} from "./components/login/login.component";
import {CoacheeProfileComponent} from "./components/coachee-profile/coachee-profile.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'register/test', component: RegisterUserComponent },
  { path: 'about', component: RegisterUserComponent },
  { path: 'contact', component: RegisterUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users/:id', component: CoacheeProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

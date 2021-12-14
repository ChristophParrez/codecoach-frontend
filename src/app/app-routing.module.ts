import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { RegisterUserComponent } from "./components/register-user/register-user.component";
import { LoginComponent } from "./components/login/login.component";
import { CoacheeProfileComponent } from "./components/coachee-profile/coachee-profile.component";
import { AboutComponent } from "./components/about/about.component";
import { CoachProfileComponent } from "./components/coach-profile/coach-profile.component";
import {CoachesComponent} from "./components/coaches/coaches.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: RegisterUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users/:id', component: CoacheeProfileComponent},
  {path: 'coach/:id', component: CoachProfileComponent},
  {path: 'coaches', component: CoachesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

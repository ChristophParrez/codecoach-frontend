import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { RegisterUserComponent } from "./components/register-user/register-user.component";
import { LoginComponent } from "./components/login/login.component";
import { CoacheeProfileComponent } from "./components/coachee-profile/coachee-profile.component";
import { AboutComponent } from "./components/about/about.component";
import { CoachProfileComponent } from "./components/coach-profile/coach-profile.component";
import { CoachesComponent } from "./components/coaches/coaches.component";
import { RequestSessionComponent } from "./components/request-session/request-session.component";
import { CoachDetailsComponent } from "./components/coach-details/coach-details.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: RegisterUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user-profile', component: CoacheeProfileComponent},
  {path: 'coach-profile', component: CoachProfileComponent},
  {path: 'coach/:id', component: CoachDetailsComponent},
  {path: 'coaches', component: CoachesComponent},
  {path: 'sessions/request/:id', component: RequestSessionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

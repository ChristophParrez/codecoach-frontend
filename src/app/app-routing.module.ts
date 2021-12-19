import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { RegisterUserComponent } from "./components/register-user/register-user.component";
import { LoginComponent } from "./components/login/login.component";
import { CoacheeProfileComponent } from "./components/coachee-profile/coachee-profile.component";
import { AboutComponent } from "./components/about/about.component";
import { CoachesComponent } from "./components/coaches/coaches.component";
import { RequestSessionComponent } from "./components/request-session/request-session.component";
import { CoachDetailsComponent } from "./components/coach-details/coach-details.component";
import { CoachCoachingSessionsComponent } from "./components/coach-coaching-sessions/coach-coaching-sessions.component";
import {
  CoacheeCoachingSessionsComponent
} from "./components/coachee-coaching-sessions/coachee-coaching-sessions.component";
import { AdminProfileComponent } from "./components/admin-profile/admin-profile.component";
import { EditTopicsComponent } from "./components/edit-topics/edit-topics.component";
import { CoacheeDetailsComponent } from "./components/coachee-details/coachee-details.component";
import { AccountComponent } from "./components/account/account.component";
import { CoachProfileComponent } from "./components/coach-profile/coach-profile.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'about', component: AboutComponent},
  {path: 'account', component: LoginComponent},
  {path: 'account/:roleOfAccount', component: AccountComponent, children: [
      {path: 'profile', component: CoacheeProfileComponent, outlet: 'view'},
      {path: 'edit-topics', component: EditTopicsComponent, outlet: 'view'},
      {path: 'coaching-sessions', component: CoacheeCoachingSessionsComponent, outlet: 'view'}
    ]},
  {path: 'contact', component: RegisterUserComponent},
  {path: 'login', component: LoginComponent},
  // {path: 'user-profile', component: CoacheeProfileComponent},
  // {path: 'user/sessions', component: CoacheeCoachingSessionsComponent},
  {path: 'user/:id', component: CoacheeDetailsComponent},

  // {path: 'coach/sessions', component: CoachCoachingSessionsComponent},
  {path: 'coach/:id', component: CoachDetailsComponent},
  {path: 'coaches', component: CoachesComponent},
  {path: 'sessions/request/:id', component: RequestSessionComponent},
  // {path: 'admin-profile', component: AdminProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

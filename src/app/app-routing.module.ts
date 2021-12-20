import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { RegisterUserComponent } from "./components/register-user/register-user.component";
import { LoginComponent } from "./components/login/login.component";
import { UserProfileComponent } from "./components/user/user-profile/user-profile.component";
import { AboutComponent } from "./components/about/about.component";
import { CoachesComponent } from "./components/coach/coaches/coaches.component";
import { RequestSessionComponent } from "./components/session/request-session/request-session.component";
import { CoachDetailsComponent } from "./components/coach/coach-details/coach-details.component";
import { UserCoachingSessionsComponent } from "./components/user/user-coaching-sessions/user-coaching-sessions.component";
import { EditTopicsComponent } from "./components/edit-topics/edit-topics.component";
import { CoacheeDetailsComponent } from "./components/coachee-details/coachee-details.component";
import { AccountComponent } from "./components/account/account.component";
import { UserListComponent } from "./components/user/user-list/user-list.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'about', component: AboutComponent},
  {path: 'account', component: LoginComponent},
  {path: 'account/:roleOfAccount', component: AccountComponent, children: [
      {path: 'profile', component: UserProfileComponent, outlet: 'view'},
      {path: 'edit-topics', component: EditTopicsComponent, outlet: 'view'},
      {path: 'coaching-sessions', component: UserCoachingSessionsComponent, outlet: 'view'},
      {path: 'user-list', component: UserListComponent, outlet: 'view'}
    ]},
  {path: 'contact', component: RegisterUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user/:id', component: CoacheeDetailsComponent},
  {path: 'coach/:id', component: CoachDetailsComponent},
  {path: 'coaches', component: CoachesComponent},
  {path: 'sessions/request/:id', component: RequestSessionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

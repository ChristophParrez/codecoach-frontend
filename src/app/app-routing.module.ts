import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { RegisterUserComponent } from "./components/register-user/register-user.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'register/test', component: RegisterUserComponent },
  { path: 'about', component: RegisterUserComponent },
  { path: 'contact', component: RegisterUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

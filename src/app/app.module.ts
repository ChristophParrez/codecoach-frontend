import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {RegisterUserComponent} from './components/register-user/register-user.component';
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {PageTitleComponent} from './components/page-title/page-title.component';
import {ErrorMessageComponent} from './components/error-message/error-message.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginComponent} from './components/login/login.component';
import {CoacheeProfileComponent} from './components/coachee-profile/coachee-profile.component';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AboutComponent} from './components/about/about.component';
import {ProfileInformationComponent} from './components/profile-information/profile-information.component';
import {MatCardModule} from "@angular/material/card";
import {UserRolesPipe} from './pipes/user-roles.pipe';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {CoachProfileComponent} from './components/coach-profile/coach-profile.component';
import {UnauthorizedComponent} from './components/unauthorized/unauthorized.component';
import {CoachesComponent} from './components/coaches/coaches.component';
import {MatSelectModule} from "@angular/material/select";
import {RequestSessionComponent} from './components/request-session/request-session.component';
import {SessionRequestFormComponent} from './components/session-request-form/session-request-form.component';
import {NameFilterPipe} from "./pipes/name-filter.pipe";
import { TopicFilterPipe } from './pipes/topic-filter.pipe';
import {MatChipsModule} from "@angular/material/chips";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CoachInformationComponent } from './components/coach-information/coach-information.component';
import { EditCoachInformationComponent } from './components/edit-coach-information/edit-coach-information.component';
import { CoachTopicsComponent } from './components/coach-topics/coach-topics.component';
import { CoachDetailsComponent } from './components/coach-details/coach-details.component';
import { StarsComponent } from './components/stars/stars.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterUserComponent,
    HomeComponent,
    PageTitleComponent,
    ErrorMessageComponent,
    LoginComponent,
    CoacheeProfileComponent,
    AboutComponent,
    ProfileInformationComponent,
    UserRolesPipe,
    EditUserComponent,
    CoachProfileComponent,
    UnauthorizedComponent,
    CoachesComponent,
    RequestSessionComponent,
    SessionRequestFormComponent,
    NameFilterPipe,
    TopicFilterPipe,
    CoachInformationComponent,
    EditCoachInformationComponent,
    CoachTopicsComponent,
    CoachDetailsComponent,
    StarsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    FontAwesomeModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-icons-round');
  }
}

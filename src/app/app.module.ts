import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatToolbarModule } from "@angular/material/toolbar";
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './components/about/about.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { MatCardModule } from "@angular/material/card";
import { UserRolesPipe } from './pipes/user-roles.pipe';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { CoachesComponent } from './components/coach/coaches/coaches.component';
import { MatSelectModule } from "@angular/material/select";
import { RequestSessionComponent } from './components/session/request-session/request-session.component';
import { SessionRequestFormComponent } from './components/session/session-request-form/session-request-form.component';
import { NameFilterPipe } from "./pipes/name-filter.pipe";
import { TopicFilterPipe } from './pipes/topic-filter.pipe';
import { MatChipsModule } from "@angular/material/chips";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CoachInformationComponent } from './components/coach/coach-information/coach-information.component';
import { EditCoachInformationComponent } from './components/coach/edit-coach-information/edit-coach-information.component';
import { CoachTopicsComponent } from './components/coach/coach-topics/coach-topics.component';
import { CoachDetailsComponent } from './components/coach/coach-details/coach-details.component';
import { StarsComponent } from './components/stars/stars.component';
import { UserCoachingSessionsComponent } from './components/user/user-coaching-sessions/user-coaching-sessions.component';
import { AccountComponent } from './components/account/account.component';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { EditTopicsComponent } from './components/edit-topics/edit-topics.component';
import { SessionsTableComponent } from "./components/session/sessions-table/sessions-table.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { CoacheeDetailsComponent } from './components/coachee-details/coachee-details.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { SmilesComponent } from './components/smiles/smiles.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker'; // https://www.freakyjolly.com/angular-material-109-datepicker-timepicker-tutorial/
import { SessionStatusPipe } from './pipes/session-status.pipe';
import { CheckCurrentUserPipe } from './pipes/check-current-user.pipe';

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
    UserProfileComponent,
    AboutComponent,
    ProfileInformationComponent,
    UserRolesPipe,
    EditUserComponent,
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
    SessionsTableComponent,
    UserCoachingSessionsComponent,
    AccountComponent,
    EditTopicsComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    CoacheeDetailsComponent,
    EnumToArrayPipe,
    UserListComponent,
    EnumToArrayPipe,
    FeedbackComponent,
    SmilesComponent,
    SmilesComponent,
    SessionStatusPipe,
    CheckCurrentUserPipe
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
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-icons-round');
  }
}

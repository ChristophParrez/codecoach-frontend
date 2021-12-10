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
import { CoacheeProfileComponent } from './components/coachee-profile/coachee-profile.component';
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";


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
    CoacheeProfileComponent
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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-icons-round');
  }
}

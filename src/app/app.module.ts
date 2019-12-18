import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './site/login/login.component';
import { HeaderComponent } from './site/header/header.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CarouselComponent } from './site/carousel/carousel.component';
import { AdminSignupComponent } from './site/admin-signup/admin-signup.component';
import { PatientSignupComponent } from './site/patient-signup/patient-signup.component';
import { AgentSignupComponent } from './site/agent-signup/agent-signup.component';
import { DoctorSignupComponent } from './site/doctor-signup/doctor-signup.component';
import { MenuComponent } from './menu/menu.component';
import { SignupOptionComponent } from './site/signup-option/signup-option.component';
import { HttpClientModule } from '@angular/common/http';
import { DoctorDetailsComponent } from './doctor/doctor-details/doctor-details.component';
import { DoctorMenuComponent } from './doctor/doctor-menu/doctor-menu.component';
import { MedicareSericeDetailsComponent } from './medicareService/medicare-serice-details/medicare-serice-details.component';
import { AgentDetailsComponent } from './agent/agent-details/agent-details.component';
import { AgentEditComponent } from './agent/agent-edit/agent-edit.component';
import { DoctorEditComponent } from './doctor/doctor-edit/doctor-edit.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { PatientDetailsComponent } from './patient/patient-details/patient-details.component';
import { NotFoundComponent } from './site/not-found/not-found.component';
import { DetailsComponent } from './details/details.component';
import { MedicareServiceEditComponent } from './medicareService/medicare-service-edit/medicare-service-edit.component';
import { AppointmentComponent } from './doctor/appointment/appointment.component';
import { AppointmentHistoryComponent } from './doctor/appointment-history/appointment-history.component';
import { UpdateTestResultsComponent } from './doctor/update-test-results/update-test-results.component';
import { ViewTestResultComponent } from './doctor/view-test-result/view-test-result.component';
import { FeedbackAnsComponent } from './feedback/feedback-ans/feedback-ans.component';
import { ForgotPasswordComponent } from './site/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './site/reset-password/reset-password.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DoctorSignupComponent,
    CarouselComponent,
    AdminSignupComponent,
    PatientSignupComponent,
    AgentSignupComponent,
    MenuComponent,
    SignupOptionComponent,
    DoctorDetailsComponent,
    DoctorMenuComponent,
    MedicareSericeDetailsComponent,
    AgentDetailsComponent,
    AgentEditComponent,
    DoctorEditComponent,
    PatientEditComponent,
    PatientDetailsComponent,
    NotFoundComponent,
    DetailsComponent,
    MedicareServiceEditComponent,
    AppointmentComponent,
    AppointmentHistoryComponent,
    UpdateTestResultsComponent,
    ViewTestResultComponent,
    FeedbackAnsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

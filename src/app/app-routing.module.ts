import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './site/login/login.component';
import { AdminSignupComponent } from './site/admin-signup/admin-signup.component';
import { PatientSignupComponent } from './site/patient-signup/patient-signup.component';
import { AgentSignupComponent } from './site/agent-signup/agent-signup.component';
import { DoctorSignupComponent } from './site/doctor-signup/doctor-signup.component';
import { MenuComponent } from './menu/menu.component';
import { SignupOptionComponent } from './site/signup-option/signup-option.component';
import { DoctorDetailsComponent } from './doctor/doctor-details/doctor-details.component';
import { AuthGuardService } from './services/authGuard.service';
import { AgentDetailsComponent } from './agent/agent-details/agent-details.component';
import { AgentEditComponent } from './agent/agent-edit/agent-edit.component';
import { PatientDetailsComponent } from './patient/patient-details/patient-details.component';
import { DoctorEditComponent } from './doctor/doctor-edit/doctor-edit.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { NotFoundComponent } from './site/not-found/not-found.component';
import { MedicareSericeDetailsComponent } from './medicareService/medicare-serice-details/medicare-serice-details.component';
import { MedicareServiceEditComponent } from './medicareService/medicare-service-edit/medicare-service-edit.component';
import { AppointmentComponent } from './doctor/appointment/appointment.component';
import { AppointmentHistoryComponent } from './doctor/appointment-history/appointment-history.component';
import { DoctorMenuComponent } from './doctor/doctor-menu/doctor-menu.component';
import { UpdateTestResultsComponent } from './doctor/update-test-results/update-test-results.component';
import { ViewTestResultComponent } from './doctor/view-test-result/view-test-result.component';
import { ForgotPasswordComponent } from './site/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './site/reset-password/reset-password.component';
import { FeedbackComponent } from './feedback/feedback.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login', component:LoginComponent},
  {path:'signup', component:PatientSignupComponent},
  {path:'signup/admin', component:AdminSignupComponent},
  {path:'signup/patient', component:PatientSignupComponent},
  {path:'signup/agent', component:AgentSignupComponent},
  {path:'signup/doctor', component:DoctorSignupComponent},
  {path:'forgotPassword', component:ForgotPasswordComponent},
  {path:'resetPassword/:id', component:ResetPasswordComponent},
  {path:'menu',component: DoctorMenuComponent, canActivate: [AuthGuardService] },
  { path: 'edit/agent/:id', component: AgentEditComponent, canActivate: [AuthGuardService] },
  { path: 'edit/doctor/:id', component: DoctorEditComponent, canActivate: [AuthGuardService] },
  { path: 'edit/patient/:id', component: PatientEditComponent, canActivate: [AuthGuardService] },
  { path: 'services/edit/:id', component: MedicareServiceEditComponent, canActivate: [AuthGuardService] },
  { path: 'bookAppointment/:id', component: AppointmentComponent, canActivate: [AuthGuardService] },
  { path: 'doctor/appointments', component: AppointmentHistoryComponent, canActivate: [AuthGuardService] },
  { path: 'doctor/viewTestResults', component: ViewTestResultComponent, canActivate: [AuthGuardService] },
  { path: 'doctor/testResults/:id', component: UpdateTestResultsComponent, canActivate: [AuthGuardService] },
 {path : 'doctors',component:DoctorDetailsComponent,canActivate: [AuthGuardService]},
 {path : 'patients',component:PatientDetailsComponent,canActivate: [AuthGuardService]},
 {path : 'agents',component:AgentDetailsComponent,canActivate: [AuthGuardService]},
 {path : 'services',component:MedicareSericeDetailsComponent,canActivate: [AuthGuardService]},
 {path : 'feedback',component:FeedbackComponent,canActivate: [AuthGuardService]},
 { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

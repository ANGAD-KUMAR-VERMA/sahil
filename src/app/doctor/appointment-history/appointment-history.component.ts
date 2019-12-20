import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { AuthService } from 'src/app/services/auth.service';
import { Appointment } from 'src/app/model/appointment.model';
import { Doctor } from 'src/app/model/doctor.model';
import { PatientService } from 'src/app/patient/patient.service';
import { AgentService } from 'src/app/agent/agent.service';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent implements OnInit {

  id:number;
  appointment:Appointment;
  appointments:Appointment[];
  tempAppointment:Appointment[];
  fetchedAppointment:Appointment;
  constructor(private doctorService:DoctorService,private authService:AuthService,
    private patientService:PatientService,private agentService:AgentService,
    private appointmentService:AppointmentService) { }

  ngOnInit() {

     if(this.authService.isDoctor){
      this.doctorService.getDoctorByUsername(this.authService.username).subscribe((data)=>{
        this.id=data['id'];
  
        this.doctorService.getAppointmentsDoctor(this.id).subscribe((dataAppointment:Appointment[])=>{
           this.tempAppointment=[...dataAppointment];
           this.appointments = [...dataAppointment];
        })
        })
     }

    else if(this.authService.isAgent){
      this.agentService.getAgentByUsername(this.authService.username).subscribe((data)=>{
        this.id=data['id'];
  
        this.agentService.getAgentAppointments(this.id).subscribe((dataAppointment:Appointment[])=>{
           this.tempAppointment=[...dataAppointment];
           this.appointments = [...dataAppointment];
        })
        })
     }

     else if(this,this.authService.isPatient){
      this.patientService.getPatientByUsername(this.authService.username).subscribe((data)=>{
        this.id=data['id'];
  
        this.patientService.getPatientAppointments(this.id).subscribe((dataAppointment:Appointment[])=>{
           this.tempAppointment=[...dataAppointment];
           this.appointments = [...dataAppointment];
        })
        })
     }

    else if(this.authService.isAdmin){
         this.appointmentService.getAdminAppointments().subscribe((dataAppointment:Appointment[])=>{
          this.tempAppointment=[...dataAppointment];
          this.appointments = [...dataAppointment];
       })
     } 
  }


  statusApprovable(){
    return this.authService.isDoctor;
  }


  disapprove(id: number) {
    this.appointmentService.getAppointment(id).subscribe((data: Appointment) => {
      this.appointment = data;
      this.appointment.status = "rejected";
      this.appointmentService.updateAppointment(this.appointment).subscribe();
    })
  }
  approve(id: number) {
    this.appointmentService.getAppointment(id).subscribe((data: Appointment) => {
      this.appointment = data;
      this.appointment.status = "confirmed";
      this.appointmentService.updateAppointment(this.appointment).subscribe();
    })
  }

  allDetailsNew(appointment:Appointment){
    this.fetchedAppointment=appointment;
  }

  isAgent(){
    return this.authService.isAgent;
  }
}

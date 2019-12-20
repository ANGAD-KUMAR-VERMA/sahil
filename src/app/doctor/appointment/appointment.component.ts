import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Appointment } from 'src/app/model/appointment.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { Doctor } from 'src/app/model/doctor.model';
import { MedicareService } from 'src/app/medicareService/medicareService.service';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/patient/patient.service';
import { AgentService } from 'src/app/agent/agent.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  id:number;
  appointmentForm:FormGroup;
  signupForm: FormGroup;
  appointmentBooked: boolean = false;
  appointment:Appointment;
  doctorID:number;
  patientID:number;
  agentID:number;
  mediService:string;
  today:string;
  constructor(
    private datepipe:DatePipe,private route:ActivatedRoute,private router:Router,
    private doctorService:DoctorService,private medicareservice:MedicareService,
    private authService:AuthService,private patientService:PatientService,
    private agentService:AgentService) { }

  ngOnInit() {
this.today=this.datepipe.transform(new Date(),'yyyy-MM-dd')

    this.appointmentForm=new FormGroup({
      'doctorId': new FormControl(null, Validators.required),
      'medicareService': new FormControl(null, Validators.required),
      'appointmentDate': new FormControl(null, Validators.required),
      'patientId':new FormControl(null,Validators.required),
      'agentId':new FormControl(null)

    })



    this.route.params.subscribe((params: Params) => {
      const doctorID = params['id'];
      this.doctorID = doctorID;
      this.doctorService.getDoctor(doctorID).subscribe((doctor: Doctor) => {
        this.medicareservice.getMedicareService(doctorID).subscribe((service)=>{
            this.mediService=service['medicareService'] 

            if(this.authService.isPatient)
            {

              this.patientService.getPatientByName(this.authService.username).subscribe((data)=>{
                this.patientID=data['id']
                console.log(data)

                if (doctor) {
                  this.appointmentForm.patchValue({
                    doctorId:this.doctorID,
                    medicareService:this.mediService,
                    patientId:this.patientID
                    
                  
                  });
                 
                } else {
                  this.router.navigate(['']);
                }
              })
            }

            else
            {
              this.agentService.getAgentByUsername(this.authService.username).subscribe((data)=>{
                this.agentID=data['id']
                console.log(data)

                if (doctor) {
                  this.appointmentForm.patchValue({
                    doctorId:this.doctorID,
                    medicareService:this.mediService,
                    agentId:this.agentID,
                    
                  
                  });
                 
                } else {
                  this.router.navigate(['']);
                }
              })
            }
           
                
            
           
        })
        console.log(this.mediService) 

      
      });
    })
  }

  onSubmitAppointmentBooking() {
   
    console.log(this.appointmentForm);

    if(this.isAgent())
    {

      this.appointment = {
        doctorId:this.appointmentForm.value.doctorId,
        bookingDate:new Date(),
        appointmentDate:this.appointmentForm.value.appointmentDate,
        patientId:this.appointmentForm.value.patientId,
        agentId:this.appointmentForm.value.agentId
      }
    }
    else
    {

      this.appointment = {
        doctorId:this.appointmentForm.value.doctorId,
        bookingDate:new Date(),
        appointmentDate:this.appointmentForm.value.appointmentDate,
        patientId:this.appointmentForm.value.patientId,
        agentId:0
      }
    }

  
  
    this.doctorService.updateAppointment(this.appointment.agentId,this.appointment.doctorId,this.appointment.patientId,this.appointment.appointmentDate).subscribe();
    this.appointmentBooked = true;
    
  }


  isAgent(){
    return this.authService.isAgent;
  }

  get doctorId(){
    return this.appointmentForm.get('doctorId');
  }
  get medicareService(){
    return this.appointmentForm.get('medicareService');
  }
  get appointmentDate(){
    return this.appointmentForm.get('appointmentDate');
  }

  get patientId(){
    return this.appointmentForm.get('patientId');
  }
}

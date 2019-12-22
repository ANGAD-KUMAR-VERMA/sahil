import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/model/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DoctorService } from 'src/app/doctor/doctor.service';
import { AgentService } from 'src/app/agent/agent.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserFeedback } from 'src/app/model/user-feedback.model';
import { Appointment } from 'src/app/model/appointment.model';
import { Patient } from 'src/app/model/patient.model';
import { Doctor } from 'src/app/model/doctor.model';
import { runInThisContext } from 'vm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  feedback:Feedback;
  constructor(private feedbackService:FeedbackService,private route:ActivatedRoute,
        private agentService:AgentService,private router:Router,private doctorService:DoctorService,
        private authService:AuthService) { }
    feedbackSubmitForm:FormGroup;
  signupForm: FormGroup;
  userFeedbacks:UserFeedback[];
  appointmentId:number;
  agentId:number;
  patientId:number;
  doctorId:number;
  appointment:Appointment;
  patient:Patient;
  doctor:Doctor;
  fetchUserFeedback:UserFeedback;
  id:number;
  listEmpty:boolean=false;

  ngOnInit() {

    this.feedbackService.getFeedback(1).subscribe((data)=>{
      this.feedback=data;
    })

    if(this.authService.isAdmin){
      this.feedbackService.getAllFeedback().subscribe((data:UserFeedback[])=>{
        this.userFeedbacks = [...data];
        if(this.userFeedbacks.length==0)
          {
            this.listEmpty=true;
          }
     })
    }

    else if(this.authService.isDoctor){
      this.doctorService.getDoctorByUsername(this.authService.username).subscribe((data)=>{
        this.id=data['id'];

        this.feedbackService.getAllFeedbackForDoctor(this.id).subscribe((data:UserFeedback[])=>{
          this.userFeedbacks = [...data];
          
          if(this.userFeedbacks.length==0)
          {
            this.listEmpty=true;
          }
        })
      })
    }
   

    this.route.params.subscribe((params:Params)=>{
      const appointmentId= params['id']
      this.appointmentId=appointmentId;

      
    this.doctorService.getAppointmentById(this.appointmentId).subscribe((data)=>{
      this.doctor=data['doctor'];
      this.patient=data['patient'];

      
      this.doctorId=this.doctor.id;
      this.patientId=this.patient.id;

    })

    })
  }

  allFeedbacks(userFeedback){
    this.fetchUserFeedback=userFeedback;
  }
   
}

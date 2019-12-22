import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../model/feedback.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AgentService } from '../agent/agent.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserFeedback } from '../model/user-feedback.model';
import { DoctorService } from '../doctor/doctor.service';
import { Appointment } from '../model/appointment.model';
import { Patient } from '../model/patient.model';
import { Doctor } from '../model/doctor.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedback:Feedback;
  constructor(private feedbackService:FeedbackService,private route:ActivatedRoute,
        private agentService:AgentService,private router:Router,private doctorService:DoctorService) { }
    feedbackSubmitForm:FormGroup;
  signupForm: FormGroup;
  userFeedback:UserFeedback;
  appointmentId:number;
  agentId:number;
  patientId:number;
  doctorId:number;
  appointment:Appointment;
  patient:Patient;
  doctor:Doctor;
  patientName:string;
  doctorName:string;

  ngOnInit() {

    this.feedbackService.getFeedback(1).subscribe((data)=>{
      this.feedback=data;
    })

    this.route.params.subscribe((params:Params)=>{
      const appointmentId= params['id']
      this.appointmentId=appointmentId;

      
    this.doctorService.getAppointmentById(this.appointmentId).subscribe((data)=>{
      this.doctor=data['doctor'];
      this.patient=data['patient'];

      
      this.doctorId=this.doctor.id;
      this.doctorName=this.doctor.firstname +" "+ this.doctor.lastname;
      this.patientId=this.patient.id;
      this.patientName=this.patient.firstname +" " + this.patient.lastname;

    })

    })

    this.feedbackSubmitForm=new FormGroup({
      'ratingQue_1': new FormControl(null),
      'ratingQue_2': new FormControl(null),
      'ratingQue_3': new FormControl(null),
      'ratingQue_4': new FormControl(null),
      'ratingQue_5': new FormControl(null),
      'ratingQue_6': new FormControl(null),
      'ratingQue_7': new FormControl(null),
      'ratingQue_8': new FormControl(null),
      'ratingQue_9': new FormControl(null, ),
      'ratingQue_10': new FormControl(null)
      
    })
  }

  onSubmitFeedback() {
    console.log(this.feedbackSubmitForm);

   
         this.userFeedback = {

          assessmentId:this.agentId,
          patientId:this.patientId,
          patientName:this.patientName,
          doctorId:this.doctorId,
          doctorName:this.doctorName,
          appointmentId:this.appointmentId,
          ratingQue_1:this.feedbackSubmitForm.get('ratingQue_1').value,
          ratingQue_2:this.feedbackSubmitForm.get('ratingQue_2').value,
          ratingQue_3:this.feedbackSubmitForm.get('ratingQue_3').value,
          ratingQue_4:this.feedbackSubmitForm.get('ratingQue_4').value,
          ratingQue_5:this.feedbackSubmitForm.get('ratingQue_5').value,
          ratingQue_6:this.feedbackSubmitForm.get('ratingQue_6').value,
          ratingQue_7:this.feedbackSubmitForm.get('ratingQue_7').value,
          ratingQue_8:this.feedbackSubmitForm.get('ratingQue_8').value,
          ratingQue_9:this.feedbackSubmitForm.get('ratingQue_9').value,
          ratingQue_10:this.feedbackSubmitForm.get('ratingQue_10').value 
        }
    
        this.feedbackService.submitFeedback(this.userFeedback).subscribe();
   

   

  
    
  }


}

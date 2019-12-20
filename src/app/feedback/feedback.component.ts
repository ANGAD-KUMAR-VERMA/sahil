import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../model/feedback.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AgentService } from '../agent/agent.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserFeedback } from '../model/user-feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedback:Feedback;
  constructor(private feedbackService:FeedbackService,private route:ActivatedRoute,
        private agentService:AgentService,private router:Router) { }
    feedbackSubmitForm:FormGroup;
  signupForm: FormGroup;
  userFeedback:UserFeedback;

  ngOnInit() {

    this.feedbackService.getFeedback(1).subscribe((data)=>{
      this.feedback=data;
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
    
  }


}

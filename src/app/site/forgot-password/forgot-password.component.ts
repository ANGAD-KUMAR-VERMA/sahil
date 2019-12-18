import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { SecurityQue } from 'src/app/model/securityQue.model';
import { DoctorService } from 'src/app/doctor/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm:FormGroup;
  submitStatus: boolean = false;
  signupForm: FormGroup;
  securityQues:SecurityQue[];
  userNameEmpty=false;
  userNameTaken=false;
  name:string;
  securityQue:string;
  securityAnswer:string;
  queAnswerMatch:boolean=true;
  userId:number;
  constructor(private authService:AuthService,private userService:UserService,private router:Router) { }

  ngOnInit() {
  
   this.userService.getSecurityQuestions().subscribe((data:SecurityQue[])=>{
        this.securityQues=[...data];
   })

  this.forgotPasswordForm=new FormGroup({
    'username': new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(50)]),
    'que': new FormControl(null, Validators.required),
    'answer': new FormControl(null, Validators.required)
   
  })
}

onSignUpSubmit(){
 
  this.name=this.forgotPasswordForm.get('username').value,
  this.securityQue=this.forgotPasswordForm.get('que').value,
  this.securityAnswer=this.forgotPasswordForm.get('answer').value

  this.userService.getUser(this.name).subscribe((data)=>{
    if( this.securityQue == data['securityQue'] && this.securityAnswer == data['securityAnswer']){
      this.userId=data['userId']
      console.log("UserId "+this.userId)
      this.router.navigate([`/resetPassword/${this.userId}`])
    }
    else{
         this.queAnswerMatch=false;
    }
  })

  this.submitStatus = true;


}
get username(){
  return this.forgotPasswordForm.get('username');
}

get que(){
  return this.forgotPasswordForm.get('que');
}
get answer(){
  return this.forgotPasswordForm.get('answer');
}

userTaken(){
  let username = this.forgotPasswordForm.get('username').value
  if(username.length==0){
    return;
  }
  this.userService.userAvailable(username).subscribe((data=>{
    
    if(username.length == 0){
      this.userNameEmpty = true;
    }
    else{
      this.userNameEmpty = false;
    }
    this.userNameTaken= data;  

  }))
}
  


}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SecurityQue } from 'src/app/model/securityQue.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/services/user.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

 
  resetPasswordForm:FormGroup;
  submitStatus: boolean = false;
  userNameEmpty=false;
  userNameTaken=false;
  name:string;
  securityQue:string;
  securityAnswer:string;
  queAnswerMatch:boolean=true;
  userId:number;
  user:User;
  constructor(private authService:AuthService,private userService:UserService,private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
  

  this.resetPasswordForm=new FormGroup({
    'password': new FormControl(null, [Validators.required,Validators.maxLength(15)]),
    'confirmPassword': new FormControl(null, [Validators.required,Validators.maxLength(15),this.isConfirmPasswordMatched.bind(this)]),
  })
}

onSignUpSubmit(){
 
  this.route.params.subscribe((params: Params) => {
    const userId = params['id'];
    this.userId = userId;

    this.userService.getUserById(userId).subscribe((data)=>{
         this.user=data;
         this.user.password=this.resetPasswordForm.get('password').value

         this.userService.updateUser(this.user,this.user.username).subscribe();
    })
    
  })


}


get password(){
  return this.resetPasswordForm.get('password');
}
get confirmPassword(){
  return this.resetPasswordForm.get('confirmPassword');
}

isConfirmPasswordMatched(formControl: FormControl) {
  if (this.resetPasswordForm) {
    if (formControl.value && formControl.value.length > 0 &&
      formControl.value !== this.resetPasswordForm.get('password').value) {
      return { 'nomatch': true };
    }
  }
  return null;
}
}

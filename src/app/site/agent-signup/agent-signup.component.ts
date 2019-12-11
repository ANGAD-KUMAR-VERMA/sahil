import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/services/user.model';
import { Agent } from 'src/app/model/agent.model';


@Component({
  selector: 'app-agent-signup',
  templateUrl: './agent-signup.component.html',
  styleUrls: ['./agent-signup.component.css']
})
export class AgentSignupComponent implements OnInit {


  agentRegisterForm:FormGroup;
  userNameTaken:boolean = false;
  userNameEmpty:boolean = true;
  submitStatus: boolean = false;
  signupForm: FormGroup;
  alreadyExist: boolean = false;
  constructor(private userService:UserService,private authService:AuthService) { }

  ngOnInit() {

    this.agentRegisterForm=new FormGroup({
      'username': new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(50)]),
      'firstname': new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(50)]),
      'lastname': new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(50)]),
      'age': new FormControl(null, [Validators.required,Validators.pattern('^[0-9]+$'), Validators.maxLength(2)]),
      'gender': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      'dateOfBirth': new FormControl(null, [Validators.required]),
      'contactNo': new FormControl(null,[Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10),Validators.minLength(10)]),
      'altContactNo': new FormControl(null, [Validators.pattern('^[0-9]+$'),Validators.maxLength(10),Validators.minLength(10)]),
      'email': new FormControl(null, [Validators.required,Validators.email,Validators.maxLength(50)]),
      'password': new FormControl(null, [Validators.required,Validators.maxLength(15)]),
      'address1': new FormControl(null, [Validators.required,Validators.maxLength(100)]),
      'address2': new FormControl(null, [Validators.maxLength(100)]),
      'city': new FormControl(null, [Validators.required,Validators.maxLength(50)]),
      'state': new FormControl(null, [Validators.required,Validators.maxLength(50)]),
      'zipcode': new FormControl(null, [Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]+$')])
    })
  }

  onSignUpSubmit(){
    console.log("helllo signup");
    console.log(this.agentRegisterForm.value['firstname']);

    this.submitStatus = true;
  let agent:Agent;
  let user:User;

  user={
    username: this.agentRegisterForm.get('username').value,
    password: this.agentRegisterForm.get('password').value,
    status:false,
    agent:{
      username: this.agentRegisterForm.get('username').value,
      firstname: this.agentRegisterForm.get('firstname').value,
      lastname: this.agentRegisterForm.get('lastname').value,
      age:this.agentRegisterForm.get('age').value,
      gender:this.agentRegisterForm.get('gender').value,
      dateOfBirth:this.agentRegisterForm.get('dateOfBirth').value,
      contactNo:this.agentRegisterForm.get('contactNo').value,
      altContactNo:this.agentRegisterForm.get('altContactNo').value,
      email:this.agentRegisterForm.get('email').value,
      password: this.agentRegisterForm.get('password').value,
      address1:this.agentRegisterForm.get('address1').value,
      address2:this.agentRegisterForm.get('address2').value,
      city:this.agentRegisterForm.get('city').value,
      state:this.agentRegisterForm.get('state').value,
      zipcode:this.agentRegisterForm.get('zipcode').value
  
    }  
  }
  console.log(user);

  
  this.userService.authenticate(user).subscribe(null, (error) => {
    this.alreadyExist = (error['error']['status'] == 400) ? true : false

    if (this.alreadyExist) {
      this.submitStatus = false;
      return;
    }
  })
  this.authService.userAuthenticated.username = user.username;
  this.agentRegisterForm.reset();
  }

  userTaken(){
    let username = this.agentRegisterForm.get('username').value
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

  get username(){
    return this.agentRegisterForm.get('username');
  }
  get firstname(){
    return this.agentRegisterForm.get('firstname');
  }
  get lastname(){
    return this.agentRegisterForm.get('lastname');
  }
  get age(){
    return this.agentRegisterForm.get('age');
  }
  get gender(){
    return this.agentRegisterForm.get('gender');
  }
  get dateOfBirth(){
    return this.agentRegisterForm.get('dateOfBirth');
  }

  get contactNo(){
    return this.agentRegisterForm.get('contactNo');
  }
  get altContactNo(){
    return this.agentRegisterForm.get('altContactNo');
  }
  get email(){
    return this.agentRegisterForm.get('email');
  }
  get password(){
    return this.agentRegisterForm.get('password');
  }
  get address1(){
    return this.agentRegisterForm.get('address1');
  }

  get address2(){
    return this.agentRegisterForm.get('address2');
  }
  get city(){
    return this.agentRegisterForm.get('city');
  }
  get state(){
    return this.agentRegisterForm.get('state');
  }
  get zipcode(){
    return this.agentRegisterForm.get('zipcode');
  }

}

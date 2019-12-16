import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Admin } from 'src/app/model/admin.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user.model';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {

  adminRegisterForm:FormGroup;
  role:string="admin";
  userNameTaken:boolean = false;
  userNameEmpty:boolean = true;
  submitStatus: boolean = false;
  signupForm: FormGroup;
  alreadyExist: boolean = false;
  constructor(private userService:UserService,private authService:AuthService) { }

  ngOnInit() {
  
  this.adminRegisterForm=new FormGroup({
    'username': new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(50)]),
    'firstname': new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(50)]),
    'lastname': new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(50)]),
    'age': new FormControl(null, [Validators.required,Validators.pattern('^[0-9]+$'), Validators.maxLength(2)]),
    'gender': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    'dateOfBirth': new FormControl(null, [Validators.required]),
    'contactNo': new FormControl(null,[Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10),Validators.minLength(10)]),
    'altContactNo': new FormControl(null, [Validators.pattern('^[0-9]+$'),Validators.maxLength(10),Validators.minLength(10)]),
    'email': new FormControl(null, [Validators.required,Validators.email,Validators.maxLength(50)]),
    'password': new FormControl(null, [Validators.required,Validators.maxLength(15)])
  })
  console.log(this.adminRegisterForm.get('firstname'));
}

onSignUpSubmit(){
  console.log("helllo Admin signup");
  console.log(this.adminRegisterForm.value['firstname']);

  this.submitStatus = true;
  let admin: Admin;
  let user:User;

  user={
    username: this.adminRegisterForm.get('username').value,
    password: this.adminRegisterForm.get('password').value,
    status:true,
    admin : {
      username: this.adminRegisterForm.get('username').value,
      firstname: this.adminRegisterForm.get('firstname').value,
      lastname: this.adminRegisterForm.get('lastname').value,
      age:this.adminRegisterForm.get('age').value,
      gender:this.adminRegisterForm.get('gender').value===true?"male":"female",
      dateOfBirth:this.adminRegisterForm.get('dateOfBirth').value,
      contactNo:this.adminRegisterForm.get('contactNo').value,
      altContactNo:this.adminRegisterForm.get('altContactNo').value,
      email:this.adminRegisterForm.get('email').value,
      password: this.adminRegisterForm.get('password').value,
      status:true
  
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
  this.adminRegisterForm.reset();

  

}
get username(){
  return this.adminRegisterForm.get('username');
}

get firstname(){
  return this.adminRegisterForm.get('firstname');
}
get lastname(){
  return this.adminRegisterForm.get('lastname');
}
get age(){
  return this.adminRegisterForm.get('age');
}
get gender(){
  return this.adminRegisterForm.get('gender');
}
get dateOfBirth(){
  return this.adminRegisterForm.get('dateOfBirth');
}

get contactNo(){
  return this.adminRegisterForm.get('contactNo');
}
get altContactNo(){
  return this.adminRegisterForm.get('altContactNo');
}
get email(){
  return this.adminRegisterForm.get('email');
}
get password(){
  return this.adminRegisterForm.get('password');
}

userTaken(){
  let username = this.adminRegisterForm.get('username').value
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

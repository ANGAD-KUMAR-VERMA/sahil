import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/services/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Patient } from 'src/app/model/patient.model';

@Component({
  selector: 'app-patient-signup',
  templateUrl: './patient-signup.component.html',
  styleUrls: ['./patient-signup.component.css']
})
export class PatientSignupComponent implements OnInit {

  patientRegisterForm:FormGroup;
  userNameTaken:boolean = false;
  userNameEmpty:boolean = true;
  submitStatus: boolean = false;
  signupForm: FormGroup;
  alreadyExist: boolean = false;
  constructor(private userService:UserService,private authService:AuthService) { }

  ngOnInit() {

    this.patientRegisterForm=new FormGroup({
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
    console.log(this.patientRegisterForm.value['firstname']);

    this.submitStatus = true;
    let patient:Patient;
    let user:User;
  
    user={
      username: this.patientRegisterForm.get('username').value,
      password: this.patientRegisterForm.get('password').value,
      status:false,
      patient:{
        username: this.patientRegisterForm.get('username').value,
        firstname: this.patientRegisterForm.get('firstname').value,
        lastname: this.patientRegisterForm.get('lastname').value,
        age:this.patientRegisterForm.get('age').value,
        gender:this.patientRegisterForm.get('gender').value,
        dateOfBirth:this.patientRegisterForm.get('dateOfBirth').value,
        contactNo:this.patientRegisterForm.get('contactNo').value,
        altContactNo:this.patientRegisterForm.get('altContactNo').value,
        email:this.patientRegisterForm.get('email').value,
        password: this.patientRegisterForm.get('password').value,
        address1:this.patientRegisterForm.get('address1').value,
        address2:this.patientRegisterForm.get('address2').value,
        city:this.patientRegisterForm.get('city').value,
        state:this.patientRegisterForm.get('state').value,
        zipcode:this.patientRegisterForm.get('zipcode').value
    
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
    this.patientRegisterForm.reset();
    }
  
    userTaken(){
      let username = this.patientRegisterForm.get('username').value
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
    return this.patientRegisterForm.get('username');
  }

  get firstname(){
    return this.patientRegisterForm.get('firstname');
  }
  get lastname(){
    return this.patientRegisterForm.get('lastname');
  }
  get age(){
    return this.patientRegisterForm.get('age');
  }
  get gender(){
    return this.patientRegisterForm.get('gender');
  }
  get dateOfBirth(){
    return this.patientRegisterForm.get('dateOfBirth');
  }

  get contactNo(){
    return this.patientRegisterForm.get('contactNo');
  }
  get altContactNo(){
    return this.patientRegisterForm.get('altContactNo');
  }
  get email(){
    return this.patientRegisterForm.get('email');
  }
  get password(){
    return this.patientRegisterForm.get('password');
  }
  get address1(){
    return this.patientRegisterForm.get('address1');
  }

  get address2(){
    return this.patientRegisterForm.get('address2');
  }
  get city(){
    return this.patientRegisterForm.get('city');
  }
  get state(){
    return this.patientRegisterForm.get('state');
  }
  get zipcode(){
    return this.patientRegisterForm.get('zipcode');
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Doctor } from 'src/app/model/doctor.model';
import { User } from 'src/app/services/user.model';
import { MedicareServices } from 'src/app/model/medicareService.model';
import { DoctorService } from 'src/app/doctor/doctor.service';
import { SecurityQue } from 'src/app/model/securityQue.model';

@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrls: ['./doctor-signup.component.css']
})
export class DoctorSignupComponent implements OnInit {

  @Input()
  medicareServices:MedicareServices[];
  tempMedicareServices:MedicareServices[];
  doctorRegisterForm:FormGroup;
  userNameTaken:boolean = false;
  userNameEmpty:boolean = true;
  submitStatus: boolean = false;
  signupForm: FormGroup;
  alreadyExist: boolean = false;
  securityQues:SecurityQue[];
  constructor(private userService:UserService,private authService:AuthService,private doctorService:DoctorService) { }

  ngOnInit() {

    this.doctorService.getServices().subscribe((data: MedicareServices[]) => {
      this.tempMedicareServices = [...data]
      this.medicareServices = [...data]
  })

  this.userService.getSecurityQuestions().subscribe((data:SecurityQue[])=>{
    this.securityQues=[...data];
})
  console.log(this.medicareServices);

    this.doctorRegisterForm=new FormGroup({
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
      'zipcode': new FormControl(null, [Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]+$')]),
      'degree': new FormControl(null, [Validators.required,Validators.maxLength(50)]),
      'speciality': new FormControl(null, [Validators.required,Validators.maxLength(50)]),
      'workhours': new FormControl(null, [Validators.required,Validators.maxLength(20)]),
      'hospitalname': new FormControl(null, [Validators.required,Validators.maxLength(100)]),
      'medicareServiceId':new FormControl(null,Validators.required),
      'que': new FormControl(null, [Validators.required]),
    'answer': new FormControl(null, [Validators.required])
    })
    console.log(this.doctorRegisterForm.get('firstname'));
  }

  onSignUpSubmit(){
    console.log("helllo signup");
    console.log(this.doctorRegisterForm.value['firstname']);
    
    this.submitStatus = true;
    let doctor:Doctor;
    let user:User;
  
    user={
      username: this.doctorRegisterForm.get('username').value,
      password: this.doctorRegisterForm.get('password').value,
      securityQue:this.doctorRegisterForm.get('que').value,
    securityAnswer:this.doctorRegisterForm.get('answer').value,
      status:false,
      doctor:{
        username: this.doctorRegisterForm.get('username').value,
        firstname: this.doctorRegisterForm.get('firstname').value,
        lastname: this.doctorRegisterForm.get('lastname').value,
        age:this.doctorRegisterForm.get('age').value,
        gender:this.doctorRegisterForm.get('gender').value===true?"male":"female",
        dateOfBirth:this.doctorRegisterForm.get('dateOfBirth').value,
        contactNo:this.doctorRegisterForm.get('contactNo').value,
        altContactNo:this.doctorRegisterForm.get('altContactNo').value,
        email:this.doctorRegisterForm.get('email').value,
        password: this.doctorRegisterForm.get('password').value,
        address1:this.doctorRegisterForm.get('address1').value,
        address2:this.doctorRegisterForm.get('address2').value,
        city:this.doctorRegisterForm.get('city').value,
        state:this.doctorRegisterForm.get('state').value,
        zipcode:this.doctorRegisterForm.get('zipcode').value,
        degree:this.doctorRegisterForm.get('degree').value,
        speciality:this.doctorRegisterForm.get('speciality').value,
        workhours:this.doctorRegisterForm.get('workhours').value,
        hospitalname:this.doctorRegisterForm.get('hospitalname').value,
        medicareServiceId:this.doctorRegisterForm.get('medicareServiceId').value


    
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
    this.doctorRegisterForm.reset();
    }
  
    userTaken(){
      let username = this.doctorRegisterForm.get('username').value
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
    return this.doctorRegisterForm.get('username');
  }

  get firstname(){
    return this.doctorRegisterForm.get('firstname');
  }
  get lastname(){
    return this.doctorRegisterForm.get('lastname');
  }
  get age(){
    return this.doctorRegisterForm.get('age');
  }
  get gender(){
    return this.doctorRegisterForm.get('gender');
  }
  get dateOfBirth(){
    return this.doctorRegisterForm.get('dateOfBirth');
  }

  get contactNo(){
    return this.doctorRegisterForm.get('contactNo');
  }
  get altContactNo(){
    return this.doctorRegisterForm.get('altContactNo');
  }
  get email(){
    return this.doctorRegisterForm.get('email');
  }
  get password(){
    return this.doctorRegisterForm.get('password');
  }
  
  get address1(){
    return this.doctorRegisterForm.get('address1');
  }

  get address2(){
    return this.doctorRegisterForm.get('address2');
  }
  get city(){
    return this.doctorRegisterForm.get('city');
  }
  get state(){
    return this.doctorRegisterForm.get('state');
  }
  get zipcode(){
    return this.doctorRegisterForm.get('zipcode');
  }
  get degree(){
    return this.doctorRegisterForm.get('degree');
  }
  get speciality(){
    return this.doctorRegisterForm.get('speciality');
  }
  get workhours(){
    return this.doctorRegisterForm.get('workhours');
  }
  get hospitalname(){
    return this.doctorRegisterForm.get('hospitalname');
  }

  get medicareServiceId(){
    return this.doctorRegisterForm.get('medicareServiceId');
  }

  get que(){
    return this.doctorRegisterForm.get('que');
  }
  get answer(){
    return this.doctorRegisterForm.get('answer');
  }

  isLogged(){
    return this.authService.loggedIn;
  }


}
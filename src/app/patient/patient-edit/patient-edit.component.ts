import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Patient } from 'src/app/model/patient.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

 
  patientEditForm:FormGroup;
  signupForm: FormGroup;
  patientEdited: boolean = false;
  patient:Patient;
  patient_Id:number;
  constructor(private route:ActivatedRoute,private patientService:PatientService,private router:Router) { }

  ngOnInit() {

    this.patientEditForm=new FormGroup({
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

    this.route.params.subscribe((params: Params) => {
      const patient_Id = params['id'];
      this.patient_Id = patient_Id;
      this.patientService.getPatient(patient_Id).subscribe((patient: Patient) => {
        patient.dateOfBirth = new Date(patient.dateOfBirth)

      
        if (patient) {
          this.patientEditForm.patchValue({
            username:patient.username,
            firstname:patient.firstname,
            lastname:patient.lastname,
            age:patient.age,
            gender:patient.gender === "male"?true:false,
            dateOfBirth: patient.dateOfBirth.toISOString().slice(0, 10),
            contactNo:patient.contactNo,
            altContactNo:patient.altContactNo,
            email:patient.email,
            password:patient.password,
            address1:patient.address1,
            address2:patient.address2,
            city:patient.city,
            state:patient.state,
            zipcode:patient.zipcode

          });
          console.log("addess"+patient.address2);
        } else {
          this.router.navigate(['']);
        }
      });
    })
  }

  onSubmitEditPatient() {
    console.log(this.patientEditForm);

    this.patient = {
      
      username:this.patientEditForm.value.username,
      firstname:this.patientEditForm.value.firstname,
      lastname:this.patientEditForm.value.lastname,
      age:this.patientEditForm.value.age,
      gender:this.patientEditForm.value.gender ===true?"male":"female",
      dateOfBirth:this.patientEditForm.value.dateOfBirth,
      contactNo:this.patientEditForm.value.contactNo,
      altContactNo:this.patientEditForm.value.altContactNo,
      email:this.patientEditForm.value.email,
      password:this.patientEditForm.value.password,
      address1:this.patientEditForm.value.address1,
      address2:this.patientEditForm.value.address2,
      city:this.patientEditForm.value.city,
      state:this.patientEditForm.value.state,
      zipcode:this.patientEditForm.value.zipcode
    }
    this.patientService.updatePatient(this.patient).subscribe();
    this.patientEdited = true;
  }

  get username(){
    return this.patientEditForm.get('username');
  }
  get firstname(){
    return this.patientEditForm.get('firstname');
  }
  get lastname(){
    return this.patientEditForm.get('lastname');
  }
  get age(){
    return this.patientEditForm.get('age');
  }
  get gender(){
    return this.patientEditForm.get('gender');
  }
  get dateOfBirth(){
    return this.patientEditForm.get('dateOfBirth');
  }

  get contactNo(){
    return this.patientEditForm.get('contactNo');
  }
  get altContactNo(){
    return this.patientEditForm.get('altContactNo');
  }
  get email(){
    return this.patientEditForm.get('email');
  }
  get password(){
    return this.patientEditForm.get('password');
  }
  get address1(){
    return this.patientEditForm.get('address1');
  }

  get address2(){
    return this.patientEditForm.get('address2');
  }
  get city(){
    return this.patientEditForm.get('city');
  }
  get state(){
    return this.patientEditForm.get('state');
  }
  get zipcode(){
    return this.patientEditForm.get('zipcode');
  }

}

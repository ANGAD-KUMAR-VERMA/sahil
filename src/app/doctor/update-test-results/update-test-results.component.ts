import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from '../doctor.service';
import { MedicalTestHistory } from 'src/app/model/medicalTestHistory.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/model/appointment.model';
import { PatientService } from 'src/app/patient/patient.service';
import { Patient } from 'src/app/model/patient.model';

@Component({
  selector: 'app-update-test-results',
  templateUrl: './update-test-results.component.html',
  styleUrls: ['./update-test-results.component.css']
})
export class UpdateTestResultsComponent implements OnInit {

 
  MedicalTestResultsForm:FormGroup;
  userNameTaken:boolean = false;
  userNameEmpty:boolean = true;
  submitStatus: boolean = false;
  signupForm: FormGroup;
 medicalTestHistory:MedicalTestHistory;
 alreadyExist=false;
 appointmentId:number;
 patient:Patient;

  constructor(private userService:UserService,private authService:AuthService,private doctorService:DoctorService,
    private route:ActivatedRoute,private router:Router,private appointmentService:AppointmentService,
    private patientService:PatientService) { }

  ngOnInit() {
    this.MedicalTestResultsForm=new FormGroup({
    'customerId':new FormControl(null,Validators.required),
    'doctorId':new FormControl(null,Validators.required),
    'agentId':new FormControl(null),
    'serviceDate':new FormControl(null,Validators.required),
    'testResultDate':new FormControl(null,Validators.required),
    'diagActualValue_1':new FormControl(null,Validators.required),
    'diagNormalRange_1':new FormControl(null,Validators.required),
    'diagActualValue_2':new FormControl(null,Validators.required),
    'diagNormalRange_2':new FormControl(null,Validators.required),
    'diagActualValue_3':new FormControl(null,Validators.required),
    'diagNormalRange_3':new FormControl(null,Validators.required),
    'diagActualValue_4':new FormControl(null,Validators.required),
    'diagNormalRange_4':new FormControl(null,Validators.required),
    'diagActualValue_5':new FormControl(null,Validators.required),
    'diagNormalRange_5':new FormControl(null,Validators.required),
    'diagActualValue_6':new FormControl(null,Validators.required),
    'diagNormalRange_6':new FormControl(null,Validators.required),
    'doctorComments':new FormControl(null,Validators.required),
    'otherInfo':new FormControl(null),
    })

    
    this.route.params.subscribe((params: Params) => {
      const appointmentId = params['id'];
      this.appointmentId = appointmentId;

      this.appointmentService.getAppointment(this.appointmentId).subscribe((appointment:Appointment)=>{
        console.log(appointment)
        if(appointment.agent==null){
          if(appointment){
            this.MedicalTestResultsForm.patchValue({
              customerId:appointment.patient.id,
             // agentId:appointment.agent.id,
              doctorId:appointment.doctor.id,
              serviceDate:appointment.appointmentDate
       
            })
          }else{
            this.router.navigate(['']);
          }
        }
        else{
          if(appointment){
            this.MedicalTestResultsForm.patchValue({
              customerId:appointment.patient.id,
              agentId:appointment.agent.id,
              doctorId:appointment.doctor.id,
              serviceDate:appointment.appointmentDate
              
       
            })
          }else{
            this.router.navigate(['']);
          }
        }
          
      })
     
    })


    
  }
  onTestResultsSubmit(){
    this.submitStatus = true;

      this.medicalTestHistory={
        customerId: this.MedicalTestResultsForm.get('customerId').value,
        doctorId: this.MedicalTestResultsForm.get('doctorId').value,
        agentId: this.MedicalTestResultsForm.get('agentId').value,
        serviceDate: this.MedicalTestResultsForm.get('serviceDate').value,
        testResultDate: this.MedicalTestResultsForm.get('testResultDate').value,
        diagActualValue_1:this.MedicalTestResultsForm.get('diagActualValue_1').value,
        diagNormalRange_1:this.MedicalTestResultsForm.get('diagNormalRange_1').value,
        diagActualValue_2:this.MedicalTestResultsForm.get('diagActualValue_2').value,
        diagNormalRange_2:this.MedicalTestResultsForm.get('diagNormalRange_2').value,
        diagActualValue_3:this.MedicalTestResultsForm.get('diagActualValue_3').value,
        diagNormalRange_3:this.MedicalTestResultsForm.get('diagNormalRange_3').value,
        diagActualValue_4:this.MedicalTestResultsForm.get('diagActualValue_4').value,
        diagNormalRange_4:this.MedicalTestResultsForm.get('diagNormalRange_4').value,
        diagActualValue_5:this.MedicalTestResultsForm.get('diagActualValue_5').value,
        diagNormalRange_5:this.MedicalTestResultsForm.get('diagNormalRange_5').value,
        diagActualValue_6:this.MedicalTestResultsForm.get('diagActualValue_6').value,
        diagNormalRange_6:this.MedicalTestResultsForm.get('diagNormalRange_6').value,
        doctorComments:this.MedicalTestResultsForm.get('doctorComments').value,
        otherInfo: this.MedicalTestResultsForm.get('otherInfo').value
         
    }
     console.log(this.medicalTestHistory)
    this.doctorService.updateMedicalTestResults(this.medicalTestHistory.customerId,this.medicalTestHistory).subscribe();
  
  }

  get customerId(){
    return this.MedicalTestResultsForm.get('customerId');
  }

  get doctorId(){
    return this.MedicalTestResultsForm.get('doctorId');
  }
  get agentId(){
    return this.MedicalTestResultsForm.get('agentId');
  }
  get serviceDate(){
    return this.MedicalTestResultsForm.get('serviceDate');
  }
  get testResultDate(){
    return this.MedicalTestResultsForm.get('testResultDate');
  }
  get diagActualValue_1(){
    return this.MedicalTestResultsForm.get('diagActualValue_1');
  }
  get diagNormalRange_1(){
    return this.MedicalTestResultsForm.get('diagNormalRange_1');
  }
  get diagActualValue_2(){
    return this.MedicalTestResultsForm.get('diagActualValue_2');
  }
  get diagNormalRange_2(){
    return this.MedicalTestResultsForm.get('diagNormalRange_2');
  }
  get diagActualValue_3(){
    return this.MedicalTestResultsForm.get('diagActualValue_3');
  }
  get diagNormalRange_3(){
    return this.MedicalTestResultsForm.get('diagNormalRange_3');
  }
  get diagActualValue_4(){
    return this.MedicalTestResultsForm.get('diagActualValue_4');
  }
  get diagNormalRange_4(){
    return this.MedicalTestResultsForm.get('diagNormalRange_4');
  }
  get diagActualValue_5(){
    return this.MedicalTestResultsForm.get('diagActualValue_5');
  }
  get diagNormalRange_5(){
    return this.MedicalTestResultsForm.get('diagNormalRange_5');
  }
  get diagActualValue_6(){
    return this.MedicalTestResultsForm.get('diagActualValue_6');
  }
  get diagNormalRange_6(){
    return this.MedicalTestResultsForm.get('diagNormalRange_6');
  }
  get doctorComments(){
    return this.MedicalTestResultsForm.get('doctorComments');
  }
  get otherInfo(){
    return this.MedicalTestResultsForm.get('otherInfo');
  }
 
}

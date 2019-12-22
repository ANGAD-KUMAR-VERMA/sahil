import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MedicalTestHistory } from 'src/app/model/medicalTestHistory.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Patient } from 'src/app/model/patient.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DatePipe } from '@angular/common';
import { PatientService } from 'src/app/patient/patient.service';
import { Appointment } from 'src/app/model/appointment.model';

@Component({
  selector: 'app-edit-test-results',
  templateUrl: './edit-test-results.component.html',
  styleUrls: ['./edit-test-results.component.css']
})
export class EditTestResultsComponent implements OnInit {

  EditMedicalTestResultsForm:FormGroup;
  userNameTaken:boolean = false;
  userNameEmpty:boolean = true;
  submitStatus: boolean = false;
  signupForm: FormGroup;
 medicalTestHistory:MedicalTestHistory;
 alreadyExist=false;
 medicalTestHistoryId:number;
 patient:Patient;
 minDate:string;

  constructor(private userService:UserService,private authService:AuthService,private doctorService:DoctorService,
    private route:ActivatedRoute,private router:Router,private appointmentService:AppointmentService,
    private patientService:PatientService,private datepipe:DatePipe) { }

  ngOnInit() {
    

    this.EditMedicalTestResultsForm=new FormGroup({
      'reportId':new FormControl(null),
    'customerId':new FormControl(null,Validators.required),
    'doctorId':new FormControl(null,Validators.required),
    'agentId':new FormControl(null),
    'serviceDate':new FormControl(null,Validators.required),
    'testResultDate':new FormControl(null,Validators.required),
    'diagActualValue_1':new FormControl(null,[Validators.required,,Validators.pattern('^[0-9]+$')]),
    'diagNormalRange_1':new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
    'diagActualValue_2':new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
    'diagNormalRange_2':new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
    'diagActualValue_3':new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
    'diagNormalRange_3':new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
    'diagActualValue_4':new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
    'diagNormalRange_4':new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
    'diagActualValue_5':new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
    'diagNormalRange_5':new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
    'diagActualValue_6':new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
    'diagNormalRange_6':new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
    'doctorComments':new FormControl(null,Validators.required),
    'otherInfo':new FormControl(null),
    })

    
    this.route.params.subscribe((params: Params) => {
      const  medicalTestHistoryId = params['id'];
      this. medicalTestHistoryId = medicalTestHistoryId;

      this.doctorService.getMedicalHistoryByID(this.medicalTestHistoryId).subscribe((medicalTestHistory: MedicalTestHistory) => {
        medicalTestHistory.serviceDate = new Date(medicalTestHistory.serviceDate)
        medicalTestHistory.testResultDate = new Date(medicalTestHistory.testResultDate)

        if (medicalTestHistory) {
          this.EditMedicalTestResultsForm.patchValue({
            reportId:medicalTestHistory.reportId,
            customerId:medicalTestHistory.customerId,
            agentId:medicalTestHistory.agentId,
            doctorId:medicalTestHistory.doctorId,
            serviceDate:medicalTestHistory.serviceDate.toISOString().slice(0, 10),
            testResultDate:medicalTestHistory.testResultDate.toISOString().slice(0,10),
            diagActualValue_1:medicalTestHistory.diagActualValue_1,
            diagNormalRange_1:medicalTestHistory.diagNormalRange_1,
            diagActualValue_2:medicalTestHistory.diagActualValue_2,
            diagActualValue_3:medicalTestHistory.diagActualValue_3,
            diagActualValue_4:medicalTestHistory.diagActualValue_4,
            diagActualValue_5:medicalTestHistory.diagActualValue_5,
            diagActualValue_6:medicalTestHistory.diagActualValue_6,
            diagNormalRange_2:medicalTestHistory.diagNormalRange_2,
            diagNormalRange_3:medicalTestHistory.diagNormalRange_3,
            diagNormalRange_4:medicalTestHistory.diagNormalRange_4,
            diagNormalRange_5:medicalTestHistory.diagNormalRange_5,
            diagNormalRange_6:medicalTestHistory.diagNormalRange_6,
            doctorComments:medicalTestHistory.doctorComments,
            otherInfo:medicalTestHistory.otherInfo


          });
        } else {
          this.router.navigate(['']);
        }

        this.minDate=this.datepipe.transform(medicalTestHistory.serviceDate,'yyyy-MM-dd')
      });
     
    })


    
  }
  onTestResultsSubmit(){
    this.submitStatus = true;

    this.patientService.getPatient(this.EditMedicalTestResultsForm.get('customerId').value).subscribe((data)=>{
         this.patient=data;

         
    this.medicalTestHistory={
      reportId:this.EditMedicalTestResultsForm.get('reportId').value,
     customerId: this.EditMedicalTestResultsForm.get('customerId').value,
     doctorId: this.EditMedicalTestResultsForm.get('doctorId').value,
     agentId: this.EditMedicalTestResultsForm.get('agentId').value,
     serviceDate: this.EditMedicalTestResultsForm.get('serviceDate').value,
     testResultDate: this.EditMedicalTestResultsForm.get('testResultDate').value,
     diagActualValue_1:this.EditMedicalTestResultsForm.get('diagActualValue_1').value,
     diagNormalRange_1:this.EditMedicalTestResultsForm.get('diagNormalRange_1').value,
     diagActualValue_2:this.EditMedicalTestResultsForm.get('diagActualValue_2').value,
     diagNormalRange_2:this.EditMedicalTestResultsForm.get('diagNormalRange_2').value,
     diagActualValue_3:this.EditMedicalTestResultsForm.get('diagActualValue_3').value,
     diagNormalRange_3:this.EditMedicalTestResultsForm.get('diagNormalRange_3').value,
     diagActualValue_4:this.EditMedicalTestResultsForm.get('diagActualValue_4').value,
     diagNormalRange_4:this.EditMedicalTestResultsForm.get('diagNormalRange_4').value,
     diagActualValue_5:this.EditMedicalTestResultsForm.get('diagActualValue_5').value,
     diagNormalRange_5:this.EditMedicalTestResultsForm.get('diagNormalRange_5').value,
     diagActualValue_6:this.EditMedicalTestResultsForm.get('diagActualValue_6').value,
     diagNormalRange_6:this.EditMedicalTestResultsForm.get('diagNormalRange_6').value,
     doctorComments:this.EditMedicalTestResultsForm.get('doctorComments').value,
     otherInfo: this.EditMedicalTestResultsForm.get('otherInfo').value,
     patient:this.patient
      
 }
  console.log(this.medicalTestHistory)
 this.doctorService.EditMedicalTestResults(this.medicalTestHistory).subscribe();

    })

  
  
  }

  get customerId(){
    return this.EditMedicalTestResultsForm.get('customerId');
  }

  get doctorId(){
    return this.EditMedicalTestResultsForm.get('doctorId');
  }
  get agentId(){
    return this.EditMedicalTestResultsForm.get('agentId');
  }
  get serviceDate(){
    return this.EditMedicalTestResultsForm.get('serviceDate');
  }
  get testResultDate(){
    return this.EditMedicalTestResultsForm.get('testResultDate');
  }
  get diagActualValue_1(){
    return this.EditMedicalTestResultsForm.get('diagActualValue_1');
  }
  get diagNormalRange_1(){
    return this.EditMedicalTestResultsForm.get('diagNormalRange_1');
  }
  get diagActualValue_2(){
    return this.EditMedicalTestResultsForm.get('diagActualValue_2');
  }
  get diagNormalRange_2(){
    return this.EditMedicalTestResultsForm.get('diagNormalRange_2');
  }
  get diagActualValue_3(){
    return this.EditMedicalTestResultsForm.get('diagActualValue_3');
  }
  get diagNormalRange_3(){
    return this.EditMedicalTestResultsForm.get('diagNormalRange_3');
  }
  get diagActualValue_4(){
    return this.EditMedicalTestResultsForm.get('diagActualValue_4');
  }
  get diagNormalRange_4(){
    return this.EditMedicalTestResultsForm.get('diagNormalRange_4');
  }
  get diagActualValue_5(){
    return this.EditMedicalTestResultsForm.get('diagActualValue_5');
  }
  get diagNormalRange_5(){
    return this.EditMedicalTestResultsForm.get('diagNormalRange_5');
  }
  get diagActualValue_6(){
    return this.EditMedicalTestResultsForm.get('diagActualValue_6');
  }
  get diagNormalRange_6(){
    return this.EditMedicalTestResultsForm.get('diagNormalRange_6');
  }
  get doctorComments(){
    return this.EditMedicalTestResultsForm.get('doctorComments');
  }
  get otherInfo(){
    return this.EditMedicalTestResultsForm.get('otherInfo');
  }
 
}

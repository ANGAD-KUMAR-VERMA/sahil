import { Component, OnInit } from '@angular/core';
import { MedicalTestHistory } from 'src/app/model/medicalTestHistory.model';
import { DoctorService } from '../doctor.service';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/patient/patient.service';

@Component({
  selector: 'app-view-test-result',
  templateUrl: './view-test-result.component.html',
  styleUrls: ['./view-test-result.component.css']
})
export class ViewTestResultComponent implements OnInit {

  patientId:number=1;
  historyEmpty:boolean=false;
  medicalTestHistorys:MedicalTestHistory[];
  constructor(private doctorService:DoctorService,private authService:AuthService,
    private patientService:PatientService) { }

  ngOnInit() {

    if(this.authService.isPatient)
    {
      this.patientService.getPatientByUsername(this.authService.username).subscribe((data)=>{
        this.patientId=data['id']
        this.doctorService.getMedicalTestHistory(this.patientId).subscribe((data:MedicalTestHistory[])=>{
          if(data.length==0){
            this.historyEmpty=true;
          }
          console.log(data.length)
          this.medicalTestHistorys = [...data];
        })
      })
    }
    else{
      this.doctorService.getMedicalTestHistory(this.patientId).subscribe((data:MedicalTestHistory[])=>{
        
        this.medicalTestHistorys = [...data];
      })
    }

  }

}

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

  patientId:number;
  doctorId:number;
  historyEmpty:boolean=false;
  medicalTestHistorys:MedicalTestHistory[];
  fetchedMedicalTestHistory:MedicalTestHistory;
  fetchPatientName:string;
  patientName:string;
  increment:number=0;
  constructor(private doctorService:DoctorService,private authService:AuthService,
    private patientService:PatientService) { }

  ngOnInit() {

    if(this.authService.isPatient)
    {
      this.patientService.getPatientByUsername(this.authService.username).subscribe((data)=>{
        this.patientId=data['id']
        this.doctorService.getMedicalTestHistory(this.patientId).subscribe((data:MedicalTestHistory[])=>{
          this.patientService.getPatient(data[this.increment].customerId).subscribe((dataa)=>{
            this.patientName=dataa['firstname']+ " " +dataa['lastname'];
            this.increment=this.increment+1;  
          })

          if(data.length==0){
            this.historyEmpty=true;
          }
          console.log(data.length)
          this.medicalTestHistorys = [...data];
        })
      })
    }
    else if(this.authService.isDoctor){
          this.doctorService.getDoctorByUsername(this.authService.username).subscribe((dataDoctor)=>{
              this.doctorId=dataDoctor['id'];
      
      this.doctorService.getMedicalHistoryByDcotorID(this.doctorId).subscribe((data:MedicalTestHistory[])=>{
        this.patientService.getPatient(data[this.increment].customerId).subscribe((dataa)=>{
          this.patientName=dataa['firstname']+ " " +dataa['lastname'];
          this.increment=this.increment+1;  
        })
        this.medicalTestHistorys = [...data];
      })
    })
    }

    else{
      this.doctorService.getAllMedicalHistory().subscribe((data:MedicalTestHistory[])=>{
        this.patientService.getPatient(data[this.increment].customerId).subscribe((dataa)=>{
          this.patientName=dataa['firstname']+ " " +dataa['lastname'];
          this.increment=this.increment+1;  
        })
        this.medicalTestHistorys = [...data];
      })
    } 


  }

  allDetailsNew(medicalTestHistory:MedicalTestHistory){
     this.fetchedMedicalTestHistory=medicalTestHistory;
     this.patientService.getPatient(medicalTestHistory.customerId).subscribe((data)=>{
      this.fetchPatientName=data['firstname']+ " " +data['lastname'];
    })

  }


  isAgent(){
    return this.authService.isAgent;
  }

}

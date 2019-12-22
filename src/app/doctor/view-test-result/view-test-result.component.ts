import { Component, OnInit } from '@angular/core';
import { MedicalTestHistory } from 'src/app/model/medicalTestHistory.model';
import { DoctorService } from '../doctor.service';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/patient/patient.service';
import { AgentService } from 'src/app/agent/agent.service';

@Component({
  selector: 'app-view-test-result',
  templateUrl: './view-test-result.component.html',
  styleUrls: ['./view-test-result.component.css']
})
export class ViewTestResultComponent implements OnInit {

  patientId:number;
  doctorId:number;
  agentId:number; 
  historyEmpty:boolean=false;
  medicalTestHistorys:MedicalTestHistory[];
  fetchedMedicalTestHistory:MedicalTestHistory;
  fetchDoctorName:string;
  fetchAgentName:string;
  increment:number=0;
  listEmpty:boolean=false;
  constructor(private doctorService:DoctorService,private authService:AuthService,
    private patientService:PatientService,private agentService:AgentService) { }

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
    else if(this.authService.isDoctor){
          this.doctorService.getDoctorByUsername(this.authService.username).subscribe((dataDoctor)=>{
              this.doctorId=dataDoctor['id'];
      
      this.doctorService.getMedicalHistoryByDcotorID(this.doctorId).subscribe((data:MedicalTestHistory[])=>{
        this.medicalTestHistorys = [...data];
        if(data.length==0){
          this.historyEmpty=true;
        }
      })
    })
    }

    else if(this.authService.isAdmin){
      this.doctorService.getAllMedicalHistory().subscribe((data:MedicalTestHistory[])=>{
        this.medicalTestHistorys = [...data];
        if(data.length==0){
          this.historyEmpty=true;
        }
      })
    }
    
    else{
      this.agentService.getAgentByUsername(this.authService.username).subscribe((data)=>{
          this.agentId=data['id'];

          this.doctorService.getMedicalHistoryByAgentID(this.agentId).subscribe((data:MedicalTestHistory[])=>{
            this.medicalTestHistorys = [...data];
            if(data.length==0){
              this.historyEmpty=true;
            }
          })
      })
    }


  }

  allDetailsNew(medicalTestHistory:MedicalTestHistory){
     this.fetchedMedicalTestHistory=medicalTestHistory;
     this.doctorService.getDoctor(medicalTestHistory.doctorId).subscribe((data)=>{
      this.fetchDoctorName=data['firstname']+ " " +data['lastname'];
    })

    this.agentService.getAgent(medicalTestHistory.agentId).subscribe((dataa)=>{
        this.fetchAgentName=dataa['firstname']+ " " +dataa['lastname'];
    })

  }


  isAgent(){
    return this.authService.isAgent;
  }

  isEditable(){
    return this.authService.isDoctor;
  }

}

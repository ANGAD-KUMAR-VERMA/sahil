import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from 'src/app/model/patient.model';
import { User } from 'src/app/services/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  @Input()
  patients: Patient[];
  tempPatients: Patient[];
  showDetails: boolean = false;

  approveStatus: boolean = false;
  isApproved = false;
  patient: Patient;
  fetchedPatient:Patient;
  roleId: number;
  listEmpty:boolean=false;

  constructor(private patientService: PatientService, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.patientService.getPatients().subscribe((data: Patient[]) => {
      this.tempPatients = [...data]
      this.patients = [...data]

      if(this.patients.length==0){
        this.listEmpty=true;
      }
    })


  }

  disApprove(id: number) {
    this.patientService.getPatient(id).subscribe((data: Patient) => {
      this.patient = data;
      this.patient.status = false;
      this.patientService.updatePatient(this.patient).subscribe();
    }) 
  }

  

  approve(id: number) {
    this.patientService.getPatient(id).subscribe((data: Patient) => {
      this.patient = data;
      this.patient.status = true;
      this.patientService.updatePatient(this.patient).subscribe();
    })
  }

  approved() {

    return this.isApproved;
  }

  isEditable() {
    if (this.authService.isAdmin )
      return true;
  }

  isApprovable() {
    return this.authService.isAdmin;
  }

  onSearchText(event: any) {
    this.patientService.filter.next({ title: event.target.value });
  }

  allDetails() {
    return this.showDetails = !this.showDetails;
  }

  allDetailsNew(patient:Patient){
    this.fetchedPatient=patient;
  }

 

}

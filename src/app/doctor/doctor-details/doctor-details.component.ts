import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from 'src/app/model/doctor.model';
import { DoctorService } from 'src/app/doctor/doctor.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  @Input()
  doctors:Doctor[];
  doctor:Doctor;
  tempDoctor:Doctor[];
  isMale:boolean;
  showDetails:boolean=false;
  fetchedDoctor:Doctor;
  listEmpty:boolean=false;
  constructor(private doctorService:DoctorService,private authService:AuthService) { }

  ngOnInit() {

    this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
      this.tempDoctor = [...data]
      this.doctors = [...data]
      if(this.doctors.length==0){
        this.listEmpty=true;
      }
  })
  }

  disApprove(id: number) {
    this.doctorService.getDoctor(id).subscribe((data: Doctor) => {
      this.doctor = data;
      this.doctor.status = false;
      this.doctorService.updateDoctor(this.doctor).subscribe();
    }) 
  }


  approve(id: number) {
    this.doctorService.getDoctor(id).subscribe((data: Doctor) => {
      this.doctor = data;
      console.log(this.doctor)
      this.doctor.status = true;
      console.log(this.doctor)
      this.doctorService.updateDoctor(this.doctor).subscribe();
    })
  }

  isEditable(){
    console.log(this.authService.isAdmin);
    return this.authService.isAdmin 
  }

  isAdmin(){
    return this.authService.isAdmin;
  }

  isApprovable(){
    return this.authService.isAdmin;
  }

  canBeBooked(){
    return this.authService.isAgent || this.authService.isPatient;
  }

  allDetails(doctor:Doctor){
    this.fetchedDoctor=doctor;
    
  }



}

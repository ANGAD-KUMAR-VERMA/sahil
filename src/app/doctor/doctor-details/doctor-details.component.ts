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
  tempDoctor:Doctor[];
  isMale:boolean;
  showDetails:boolean=false;
  constructor(private doctorService:DoctorService,private authService:AuthService) { }

  ngOnInit() {

    this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
      this.tempDoctor = [...data]
      this.doctors = [...data]
      console.log(this.doctors);

  })
  }

  isEditable(){
    return this.authService.isAdmin
  }

  allDetails(){
    return this.showDetails=this.showDetails;
    
  }

}

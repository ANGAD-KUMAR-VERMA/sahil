import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-doctor-menu',
  templateUrl: './doctor-menu.component.html',
  styleUrls: ['./doctor-menu.component.css']
})
export class DoctorMenuComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  canSubmitFeedback(){
     return this.authService.isPatient || this.authService.isAgent
  }

  canAddAgent(){
    return this.authService.isAdmin;
  }

  canAddDoctor(){
    return this.authService.isAdmin;
  }

  canSeeFeedback(){
    return this.authService.isAdmin || this.authService.isDoctor;
  }

}

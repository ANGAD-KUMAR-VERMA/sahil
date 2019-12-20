import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  onSignOut() {
    this.authService.logOut();
  }

  isLoggedIn(){
    return this.authService.loggedIn
  }

  isPatient(){
    return this.authService.isPatient;
  }

  isDoctor(){
    return this.authService.isDoctor;
  }

  isAgent(){
    return this.authService.isAgent;
  }

  getUser(){
   return this.authService.username;
  }


}

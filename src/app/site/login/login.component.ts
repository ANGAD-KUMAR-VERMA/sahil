import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginValid = true;
  username:string;
  role:string;
  authSource: string;
  isUserAuthenticated:boolean=true;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.authSource = this.authService.authSource
  }


  onSubmit(form: NgForm) {

    console.log("in login component ts");
    this.authSource = ''
    this.authService.authSource = '';
    const username = form.value.username;
    console.log(username);
    const password = form.value.password;
    console.log(password);
    if (username === 'Chitransh') {
      this.isLoginValid = false;
    } else {


      this.authService.logIn(username, password).subscribe((data) => {
        this.authService.accessToken = data['token'];
        this.role=data['role'];
        this.username=data['username'];
        this.authService.username=this.username;
        console.log(this.username)
        console.log("ROle "+this.role);
        this.authService.isAdmin = data['role'] == 'ROLE_ADMIN' ? true : false;
        this.authService.isDoctor = data['role'] == 'ROLE_DOCTOR' ? true : false;
        this.authService.isAgent = data['role'] == 'ROLE_AGENT' ? true : false;
        this.authService.loggedIn = true;
        if (this.authService.isAdmin) {
            this.authService.userAuthenticated = { username: username,  accessToken: this.authService.accessToken,status:true,password:"pwd" }
        }
        else {
            this.authService.userAuthenticated = { username: username, accessToken: this.authService.accessToken,status:true,password:"pwd" }
        }
        this.router.navigate(['/menu']);
    },(error)=>{
      this.isLoginValid = (error['status'] == 401) ? false : true;
      
    });
    }

    if(this.isLoginValid){

      this.authService.getUser(username).subscribe((data)=>{
        this.isUserAuthenticated=data['status']
        if(!this.isUserAuthenticated){
          this.isLoginValid=true;
        }
        console.log("Is user Authenticated "+this.isUserAuthenticated);
         })
    }
  }
  setUserAuthenticated(){
    this.isUserAuthenticated=true;
    this.isLoginValid=true;
  }
}

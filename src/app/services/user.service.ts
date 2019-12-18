import { Injectable, Input, OnInit } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class UserService  {

    @Input()
    user:User[];
    isUserAuthenticated:boolean=false;

    constructor(private http:HttpClient) {
    }

    authenticate(user:User):Observable<any> {
        return this.http.post(`http://localhost:1002/users`,user)
    }
    userAvailable(username:string):Observable<boolean> {
        return this.http.get<boolean>(`http://localhost:1002/users/${username}`)
    }

    
    getUser(username:string):Observable<any>{
        return this.http.get<User>(`http://localhost:1002/users/get/${username}`)
    }

    getUserById(username:string):Observable<any>{
        return this.http.get<User>(`http://localhost:1002/users/getById/${username}`)
    }

    updateUser(user:User,username:string):Observable<any>{
        return this.http.put<User>(`http://localhost:1002/users/${username}`,user)
    }

    updatePatient(user:User,username:string): Observable<any> {
        //let header = new HttpHeaders();
      //  header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.put(`http://localhost:1002/users/${username}`,user)
    }

    getSecurityQuestions():Observable<any>{
      
        return this.http.get(`http://localhost:1002/securityQue`)
    }
   
   

 
}


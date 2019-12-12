import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    loggedIn = false;
    isAdmin = false;
    isAgent=false;
    isDoctor=false;
    redirectUrl: string = '/';
    userAuthenticated: User;
    authSource: string = '';
    accessToken: string;
    username:string;

    constructor(private userService: UserService, private httpService: HttpClient) {

    }

    logIn(username: string, password: string):Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Basic ' + btoa(username + ':' + password));

        return this.httpService.get("http://localhost:1002/authenticate", { headers: header })
        this.loggedIn=true;
    }

    getUser(username:string):Observable<any>{
        return this.httpService.get<User>(`http://localhost:1002/users/get/${username}`)
    }


    logOut() {
        this.redirectUrl = '/';
        this.loggedIn = false;
    }
    isUserAdmin() {
        return this.isAdmin;
    }

}


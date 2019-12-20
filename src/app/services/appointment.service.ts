import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, Observer } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Appointment } from '../model/appointment.model';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    configUrl: string = 'http://localhost:8081/';
    filter = new Subject();

    constructor(private http: HttpClient, private authService: AuthService) {

    }
  
    getAdminAppointments():Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/users/admin/appointments`, { headers: header })
    }

    getAppointment(id:number):Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/users/get/appointment/${id}`, { headers: header })
    }

    updateAppointment(appointment:Appointment):Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.put(`http://localhost:8081/users/appointments`,appointment, { headers: header })
  
    }


}
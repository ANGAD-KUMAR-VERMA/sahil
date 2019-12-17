import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, Observer } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Patient } from '../model/patient.model';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    
    filter = new Subject();

    constructor(private http: HttpClient, private authService: AuthService) {

    }
    getPatients(): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get("http://localhost:1002/users/patients", { headers: header })
    }

    updatePatient(patient:Patient): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.put("http://localhost:1002/users/patients",patient,{ headers: header })
    }
    
    getPatient(id: number): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:1002/users/patients/${id}`, { headers: header })
       
    }

    getPatientByName(username:string):Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:1002/users/get/patients/${username}`, { headers: header })
    }

    getPatientAppointments(patientId:number):Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:1002/users/get/appointments/${patientId}`, { headers: header })
    }

    getPatientByUsername(username:string): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:1002/users/get/patients/${username}`, { headers: header })  
    }


}
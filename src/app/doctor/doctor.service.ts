import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, Observer } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Doctor } from '../model/doctor.model';
import { MedicalTestHistory } from '../model/medicalTestHistory.model';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    configUrl: string = 'http://localhost:1002/';
    filter = new Subject();

    constructor(private http: HttpClient, private authService: AuthService) {

    }
    getDoctors(): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get("http://localhost:1002/users/doctors", { headers: header })
    }

    updateDoctor(doctor:Doctor): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.put("http://localhost:1002/users/doctors",doctor,{ headers: header })
    }
    
    getDoctor(id: number): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:1002/users/doctors/${id}`, { headers: header })  
    }

    getDoctorByUsername(username:string): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:1002/users/get/doctors/${username}`, { headers: header })  
    }
 
    getServices(): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get("http://localhost:1002/users/medicareServices", { headers: header })
    }

    updateAppointment(agentId:number,doctorId:number,patientId:number,appointmentDate:Date):Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.put(`http://localhost:1002/users/appointment/${agentId}/${doctorId}/${patientId}/${appointmentDate}`, { headers: header })
  
    }

    getAppointmentsDoctor(doctorId:number){
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:1002/users/doctors/appointments/${doctorId}`, { headers: header })  
    }

    updateMedicalTestResults(medicalTestHistory:MedicalTestHistory){
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.post(`http://localhost:1002/medicalTestHistory`,medicalTestHistory, { headers: header })  
    }

    getMedicalTestHistory(patientId:number):Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:1002/medicalTestHistory/${patientId}`, { headers: header })  
 
    }
    


}
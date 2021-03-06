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
    configUrl: string = 'http://localhost:8081/';
    filter = new Subject();

    constructor(private http: HttpClient, private authService: AuthService) {

    }
    getDoctors(): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get("http://localhost:8081/users/doctors", { headers: header })
    }

    updateDoctor(doctor:Doctor): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.put("http://localhost:8081/users/doctors",doctor,{ headers: header })
    }
    
    getDoctor(id: number): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/users/doctors/${id}`, { headers: header })  
    }

    getDoctorByUsername(username:string): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/users/get/doctors/${username}`, { headers: header })  
    }
 
    getServices(): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get("http://localhost:8081/users/medicareServices", { headers: header })
    }

    updateAppointment(agentId:number,doctorId:number,patientId:number,appointmentDate:Date):Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.put(`http://localhost:8081/users/appointment/${agentId}/${doctorId}/${patientId}/${appointmentDate}`, { headers: header })
  
    }

    getAppointmentsDoctor(doctorId:number){
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/users/doctors/appointments/${doctorId}`, { headers: header })  
    }

    getAppointmentById(id:number){
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/users/get/appointment/${id}`, { headers: header })  
    }

    updateMedicalTestResults(id:number,medicalTestHistory:MedicalTestHistory){
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.post(`http://localhost:8081/medicalTestHistory/${id}`,medicalTestHistory, { headers: header })  
    }

    EditMedicalTestResults(medicalTestHistory:MedicalTestHistory){
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.put(`http://localhost:8081/medicalTestHistory/put`,medicalTestHistory, { headers: header })  
    }
    getMedicalTestHistory(patientId:number):Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/medicalTestHistory/patient/${patientId}`, { headers: header })  
    } 
    getMedicalHistoryByDcotorID(doctorId:number):Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/medicalTestHistory/${doctorId}`, { headers: header })  
    }

    getMedicalHistoryByAgentID(agentId:number):Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/medicalTestHistory/agent/${agentId}`, { headers: header })  
    }

    getMedicalHistoryByID(id:number):Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/medicalTestHistory/get/${id}`, { headers: header })  
    }


    getAllMedicalHistory():Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/medicalTestHistory`, { headers: header }) 
    }


}
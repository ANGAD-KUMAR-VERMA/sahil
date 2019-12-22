import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, Observer } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Doctor } from '../model/doctor.model';
import { MedicalTestHistory } from '../model/medicalTestHistory.model';
import { UserFeedback } from '../model/user-feedback.model';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    configUrl: string = 'http://localhost:8081/';
    filter = new Subject();

    constructor(private http: HttpClient, private authService: AuthService) {

    }
    getFeedback(id:number): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/feedback/${id}`, { headers: header })
    }

    submitFeedback(feedback:UserFeedback):Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.post(`http://localhost:8081/userFeedback`,feedback, { headers: header })
    }

    getAllFeedback():Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/userFeedback`, { headers: header })
    }

    getAllFeedbackForDoctor(id:number):Observable<any>{
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:8081/userFeedback/doctor/${id}`, { headers: header })
    }

   


}
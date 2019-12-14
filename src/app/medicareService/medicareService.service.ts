import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, Observer } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Doctor } from '../model/doctor.model';
import { MedicareServices } from '../model/medicareService.model';

@Injectable({
    providedIn: 'root'
})
export class MedicareService {
    configUrl: string = 'http://localhost:1002/';
    filter = new Subject();

    constructor(private http: HttpClient, private authService: AuthService) {

    }
    getMedicareServices(): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get("http://localhost:1002/medicareServices", { headers: header })
    }

    updateMedicareServices(medicareServices:MedicareServices): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.put("http://localhost:1002/medicareServices",medicareServices,{ headers: header })
    }
    
    getMedicareService(id: number): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get(`http://localhost:1002/medicareServices/${id}`, { headers: header })
        
    }


}
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, Observer } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Agent } from '../model/agent.model';

@Injectable({
    providedIn: 'root'
})
export class AgentService {
    configUrl: string = 'http://localhost:8080/';
    filter = new Subject();

    constructor(private http: HttpClient, private authService: AuthService) {

    }
    getAgents(): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.get("http://localhost:8080/users/agents", { headers: header })
    }

    updateAgent(agent:Agent): Observable<any> {
        let header = new HttpHeaders();
        header = header.set('Authorization', 'Bearer ' + this.authService.accessToken);
        return this.http.put("http://localhost:8080/users/agents",agent,{ headers: header })
    }
    
    getAgent(id: number): Observable<any> {

        return Observable.create((observer: Observer<Agent>) => {
            this.getAgents().subscribe((agents: Agent[]) => {
                
                const agentList = agents.find(agent => agent.id== id);
                
                observer.next(agentList)
            })
        })
    }

}
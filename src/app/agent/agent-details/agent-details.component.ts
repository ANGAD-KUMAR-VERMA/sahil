import { Component, OnInit, Input } from '@angular/core';
import { Agent } from 'src/app/model/agent.model';
import { AgentService } from '../agent.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent implements OnInit {

  @Input()
  agents: Agent[];
  agent: Agent;
  tempAgent: Agent[];
  isMale: boolean;
  showDetails: boolean = false;
  fetchedAgent:Agent;
  listEmpty:boolean=false;
  constructor(private agentService: AgentService, private authService: AuthService) { }

  ngOnInit() {

    this.agentService.getAgents().subscribe((data: Agent[]) => {
      this.tempAgent = [...data]
      this.agents = [...data]
      if(this.agents.length==0){
        this.listEmpty=true;
      }

    })
  }

  disApprove(id: number) {
    this.agentService.getAgent(id).subscribe((data: Agent) => {
      this.agent = data;
      this.agent.status = false;
      this.agentService.updateAgent(this.agent).subscribe();
    })
  }
  approve(id: number) {
    this.agentService.getAgent(id).subscribe((data: Agent) => {
      this.agent = data;
      this.agent.status = true;
      this.agentService.updateAgent(this.agent).subscribe();
    })
  }

  allDetailsNew(agent:Agent){
    this.fetchedAgent=agent;
  }

  isEditable() {
    return (this.authService.isAdmin );
  }

  isApprovable() {
    return this.authService.isAdmin;
  }

}

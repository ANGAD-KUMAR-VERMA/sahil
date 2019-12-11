import { Component, OnInit, Input } from '@angular/core';
import { Agent } from 'src/app/model/agent.model';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent implements OnInit {

  @Input()
  agents:Agent[];
  tempAgent:Agent[];
  isMale:boolean;
  showDetails:boolean=false;
  constructor(private agentService:AgentService) { }

  ngOnInit() {

    this.agentService.getAgents().subscribe((data: Agent[]) => {
      this.tempAgent = [...data]
      this.agents = [...data]
      console.log(this.agents);

  })
  }

  allDetails(){
    return this.showDetails=!this.showDetails;
  }

}

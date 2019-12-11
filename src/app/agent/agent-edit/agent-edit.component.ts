import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AgentService } from '../agent.service';
import { Agent } from 'src/app/model/agent.model';


@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.css']
})
export class AgentEditComponent implements OnInit {

  agentEditForm:FormGroup;
  signupForm: FormGroup;
  agentEdited: boolean = false;
  agent:Agent;
  agent_Id:number;
  constructor(private route:ActivatedRoute,private agentService:AgentService,private router:Router) { }

  ngOnInit() {

    this.agentEditForm=new FormGroup({
      'username': new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(50)]),
      'firstname': new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(50)]),
      'lastname': new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(50)]),
      'age': new FormControl(null, [Validators.required,Validators.pattern('^[0-9]+$'), Validators.maxLength(2)]),
      'gender': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      'dateOfBirth': new FormControl(null, [Validators.required]),
      'contactNo': new FormControl(null,[Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10),Validators.minLength(10)]),
      'altContactNo': new FormControl(null, [Validators.pattern('^[0-9]+$'),Validators.maxLength(10),Validators.minLength(10)]),
      'email': new FormControl(null, [Validators.required,Validators.email,Validators.maxLength(50)]),
      'password': new FormControl(null, [Validators.required,Validators.maxLength(15)]),
      'address1': new FormControl(null, [Validators.required,Validators.maxLength(100)]),
      'address2': new FormControl(null, [Validators.maxLength(100)]),
      'city': new FormControl(null, [Validators.required,Validators.maxLength(50)]),
      'state': new FormControl(null, [Validators.required,Validators.maxLength(50)]),
      'zipcode': new FormControl(null, [Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]+$')])
    })

    this.route.params.subscribe((params: Params) => {
      const agentId = params['id'];
      console.log("AgentId_1"+agentId);
      this.agent_Id = agentId;
      console.log("AgentId_2"+agentId);
      this.agentService.getAgent(agentId).subscribe((agent: Agent) => {
        agent.dateOfBirth = new Date(agent.dateOfBirth)

      
        if (agent) {
          this.agentEditForm.patchValue({
            username:agent.username,
            firstname:agent.firstname,
            lastname:agent.lastname,
            age:agent.age,
            gender:agent.gender === true?"male":"female",
            dateOfBirth: agent.dateOfBirth.toISOString().slice(0, 10),
            contactNo:agent.contactNo,
            altContactNo:agent.altContactNo,
            email:agent.email,
            password:agent.password,
            address1:agent.address1,
            address2:agent.address2,
            city:agent.city,
            state:agent.state,
            zipcode:agent.zipcode

          });
        } else {
          this.router.navigate(['']);
        }
      });
    })
  }

  onSubmitEditAgent() {
    console.log(this.agentEditForm);

    this.agent = {
      
      username:this.agentEditForm.value.username,
      firstname:this.agentEditForm.value.firstname,
      lastname:this.agentEditForm.value.lastname,
      age:this.agentEditForm.value.age,
      gender:this.agentEditForm.value.gender,
      dateOfBirth:this.agentEditForm.value.dateOfBirth,
      contactNo:this.agentEditForm.value.contactNo,
      altContactNo:this.agentEditForm.value.altContactNo,
      email:this.agentEditForm.value.email,
      password:this.agentEditForm.value.password,
      address1:this.agentEditForm.value.address1,
      address2:this.agentEditForm.value.address2,
      city:this.agentEditForm.value.city,
      state:this.agentEditForm.value.state,
      zipcode:this.agentEditForm.value.zipcode
    }
    console.log(this.agent)
    this.agentService.updateAgent(this.agent).subscribe();
    this.agentEdited = true;
  }

  get username(){
    return this.agentEditForm.get('username');
  }
  get firstname(){
    return this.agentEditForm.get('firstname');
  }
  get lastname(){
    return this.agentEditForm.get('lastname');
  }
  get age(){
    return this.agentEditForm.get('age');
  }
  get gender(){
    return this.agentEditForm.get('gender');
  }
  get dateOfBirth(){
    return this.agentEditForm.get('dateOfBirth');
  }

  get contactNo(){
    return this.agentEditForm.get('contactNo');
  }
  get altContactNo(){
    return this.agentEditForm.get('altContactNo');
  }
  get email(){
    return this.agentEditForm.get('email');
  }
  get password(){
    return this.agentEditForm.get('password');
  }
  get address1(){
    return this.agentEditForm.get('address1');
  }

  get address2(){
    return this.agentEditForm.get('address2');
  }
  get city(){
    return this.agentEditForm.get('city');
  }
  get state(){
    return this.agentEditForm.get('state');
  }
  get zipcode(){
    return this.agentEditForm.get('zipcode');
  }

}

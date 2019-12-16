import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MedicareServices } from 'src/app/model/medicareService.model';
import { MedicareService } from '../medicareService.service';

@Component({
  selector: 'app-medicare-service-edit',
  templateUrl: './medicare-service-edit.component.html',
  styleUrls: ['./medicare-service-edit.component.css']
})
export class MedicareServiceEditComponent implements OnInit {
id:number;
  medicareServiceEditForm:FormGroup;
  signupForm: FormGroup;
  medicareServiceEdited: boolean = false;
  medicareservices:MedicareServices;
  medicareServiceId:number;
  constructor(private route:ActivatedRoute,private router:Router,private medicareService:MedicareService) { }

  ngOnInit() {
    this.medicareServiceEditForm=new FormGroup({
      'medicareService': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      'serviceDescription': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      'amount': new FormControl(null, Validators.required)

    })

    this.route.params.subscribe((params: Params) => {
      const medicareServiceId = params['id'];
      this.medicareServiceId = medicareServiceId;
      this.medicareService.getMedicareService(medicareServiceId).subscribe((medicareServices: MedicareServices) => {
        if (medicareServices) {
          this.medicareServiceEditForm.patchValue({
            medicareService:medicareServices.medicareService,
            serviceDescription:medicareServices.serviceDescription,
            amount:medicareServices.amount,
          });
         
        } else {
          this.router.navigate(['']);
        }
      });
    })
  }

  onSubmitEditMedicareService() {
    console.log(this.medicareServiceEditForm);

    this.medicareservices = {
     id:this.medicareServiceId,
      medicareService:this.medicareServiceEditForm.value.medicareService,
      serviceDescription:this.medicareServiceEditForm.value.serviceDescription,
      amount:this.medicareServiceEditForm.value.amount,
     
    }
  
    this.medicareService.updateMedicareServices(this.medicareservices).subscribe();
    this.medicareServiceEdited = true;
  }


  get service(){
    return this.medicareServiceEditForm.get('medicareService');
  }
  get serviceDescription(){
    return this.medicareServiceEditForm.get('serviceDescription');
  }
  get amount(){
    return this.medicareServiceEditForm.get('amount');
  }

}

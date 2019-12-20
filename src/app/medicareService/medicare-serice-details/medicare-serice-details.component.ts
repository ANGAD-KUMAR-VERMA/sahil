import { Component, OnInit } from '@angular/core';
import { MedicareServices } from 'src/app/model/medicareService.model';
import { MedicareService } from '../medicareService.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-medicare-serice-details',
  templateUrl: './medicare-serice-details.component.html',
  styleUrls: ['./medicare-serice-details.component.css']
})
export class MedicareSericeDetailsComponent implements OnInit {

  tempMedicareServices:MedicareServices[];
  medicareServices:MedicareServices[];
  
  constructor(private medicareService:MedicareService,private authService:AuthService) { }

  ngOnInit() {

    this.medicareService.getMedicareServices().subscribe((data: MedicareServices[]) => {
      this.tempMedicareServices = [...data]
      this.medicareServices = [...data]
      console.log(this.medicareServices);

    })
  }

  isEditable(){
   return this.authService.isAdmin || this.authService.isDoctor;
  }

}

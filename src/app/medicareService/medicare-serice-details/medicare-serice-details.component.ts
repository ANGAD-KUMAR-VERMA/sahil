import { Component, OnInit } from '@angular/core';
import { MedicareServices } from 'src/app/model/medicareService.model';
import { MedicareService } from '../medicareService.service';

@Component({
  selector: 'app-medicare-serice-details',
  templateUrl: './medicare-serice-details.component.html',
  styleUrls: ['./medicare-serice-details.component.css']
})
export class MedicareSericeDetailsComponent implements OnInit {

  tempMedicareServices:MedicareServices[];
  medicareServices:MedicareServices[];
  
  constructor(private medicareService:MedicareService) { }

  ngOnInit() {

    this.medicareService.getMedicareServices().subscribe((data: MedicareServices[]) => {
      this.tempMedicareServices = [...data]
      this.medicareServices = [...data]
      console.log(this.medicareServices);

    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Appointment } from 'src/app/model/appointment.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { Doctor } from 'src/app/model/doctor.model';
import { MedicareService } from 'src/app/medicareService/medicareService.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  id:number;
  appointmentForm:FormGroup;
  signupForm: FormGroup;
  appointmentBooked: boolean = false;
  appointment:Appointment;
  doctorID:number;
  constructor(private route:ActivatedRoute,private router:Router,private doctorService:DoctorService,private medicareservice:MedicareService) { }

  ngOnInit() {
    this.appointmentForm=new FormGroup({
      'doctorId': new FormControl(null, Validators.required),
      'medicareService': new FormControl(null, Validators.required),
      'appointmentDate': new FormControl(null, Validators.required),
      'patientId':new FormControl(null,Validators.required)

    })

    this.route.params.subscribe((params: Params) => {
      const doctorID = params['id'];
      this.doctorID = doctorID;
      this.doctorService.getDoctor(doctorID).subscribe((doctor: Doctor) => {
        if (doctor) {
          this.appointmentForm.patchValue({
            doctorId:this.doctorID,
            medicareService:doctor.medicareServiceId,
            
          
          });
         
        } else {
          this.router.navigate(['']);
        }
      });
    })
  }

  onSubmitEditMedicareService() {
   /*
    console.log(this.appointmentForm);

    this.appointment = {
      doctorId:this.appointmentForm.value.doctorId,
      medicareService:this.appointmentForm.value.medicareService,
      appointmentDate:this.appointmentForm.value.appointmentDate,
      patientId:this.appointmentForm.value.patientId,
     
    }
  
    this.medicareService.updateMedicareServices(this.appointment).subscribe();
    this.appointmentBooked = true;
    */
  }


  get doctorId(){
    return this.appointmentForm.get('doctorId');
  }
  get medicareService(){
    return this.appointmentForm.get('medicareService');
  }
  get appointmentDate(){
    return this.appointmentForm.get('appointmentDate');
  }

  get patientId(){
    return this.appointmentForm.get('patientId');
  }
}

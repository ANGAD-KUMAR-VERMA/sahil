import { Doctor } from './doctor.model';
import { Patient } from './patient.model';
import { Agent } from './agent.model';


export interface Appointment{
    id:number;
    bookingDate:Date;
    appointmentDate:Date;
    doctor:Doctor;
    patient:Patient;
    Agent?:Agent;

}
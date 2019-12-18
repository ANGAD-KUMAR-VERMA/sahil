import { Doctor } from './doctor.model';
import { Patient } from './patient.model';
import { Agent } from './agent.model';


export interface Appointment{
    id?:number;
    bookingDate:Date;
    appointmentDate:Date;
    doctorId:number;
    patientId:number;
    agentId?:number;
    status?:string;
    doctor?:Doctor;
    patient?:Patient;
    agent?:Agent;

}
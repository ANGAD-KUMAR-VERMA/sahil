import { MedicalTestHistory } from './medicalTestHistory.model';

export interface Patient{
    id?:number;
    username:string;
    firstname:string;
    lastname:string;
    password:string;
    age:string;
    gender:string;
    dateOfBirth:Date;
    contactNo:string;
    altContactNo:string;
    email:string;
    address1:string;
    address2:string;
    city:string;
    state:string;
    zipcode:string;
    status?:boolean;
    medicalTestHistory?:MedicalTestHistory[];
}
import { Patient } from './patient.model';

export interface MedicalTestHistory{
   reportId?:number;
   customerId:number;
   doctorId:number;
   agentId:number;
   serviceDate:Date;
   testResultDate:Date;
   diagActualValue_1:number;
   diagNormalRange_1:number;
   diagActualValue_2:number;
   diagNormalRange_2:number;
   diagActualValue_3:number;
   diagNormalRange_3:number;
   diagActualValue_4:number;
   diagNormalRange_4:number;
   diagActualValue_5:number;
   diagNormalRange_5:number;
   diagActualValue_6:number;
   diagNormalRange_6:number;
   doctorComments:string;
   otherInfo?:string;
   patient?:Patient;
   
  
}
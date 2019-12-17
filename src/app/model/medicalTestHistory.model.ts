export interface MedicalTestHistory{
   id?:number;
   patientId:number;
   doctorId:number;
   agentId:number;
   serviceDate:Date;
   testResultDate:Date;
   diagActualValue_1:number;
   diagNormalValue_1:number;
   diagActualValue_2:number;
   diagNormalValue_2:number;
   diagActualValue_3:number;
   diagNormalValue_3:number;
   diagActualValue_4:number;
   diagNormalValue_4:number;
   diagActualValue_5:number;
   diagNormalValue_5:number;
   diagActualValue_6:number;
   diagNormalValue_6:number;
   doctorComments:string;
   otherInfo?:string;
}
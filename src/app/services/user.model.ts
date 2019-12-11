import { Admin } from '../model/admin.model';
import { Patient } from '../model/patient.model';
import { Doctor } from '../model/doctor.model';
import { Agent } from '../model/agent.model';
import { Role } from '../model/role.model';

export interface User {
    username: string;
    password: string;
    status?: boolean;
    roleList?:Role[],
    accessToken?:string;
    admin?:Admin;
    patient?:Patient;
    agent?:Agent;
    doctor?:Doctor;
}
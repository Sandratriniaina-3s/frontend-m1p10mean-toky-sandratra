import { Car } from "./car.interface";
import { PaymentStatus } from "./payments.interface";
import { User } from "./user.interface";

export interface Operation{
    _id:any,
    label:string,
    duration:number,
    cost:number,
}

export enum RepairStatus{
    DEPOSITED = 'Depose',
    REPAIRING = 'En cours de reparation',
    TESTING = 'En cours de verification',
    TO_BE_TAKEN = 'Arecuperer'
}

export interface Repair{
    _id:any,
    car:string | Car,
    status : RepairStatus,
    operations: string[] | Operation[],
    cost: number,
    arrivedAt:Date,
    finishedAt:Date,
    reparationBegin:Date,
    paymentStatus?:PaymentStatus,
    note:string,
    reparationDuration: string,
    supervisor:string | User,
}

export interface DashboardData{
    dailyTurnover: number,
    monthlyTurnover:number,
    averageRepairTime:string,
    onGoingRepairs:number,
    unpaidRepairs:number,
}
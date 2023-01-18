import { Car } from "./car.interface";
import { User } from "./user.interface";

export interface Operation{
    _id:any,
    label:string,
    duration:number,
    cost:number,
}

export enum RepairStatus{
    DEPOSITED = 'Déposé',
    REPAIRING = 'En cours de reparation',
    TESTING = 'En cours de verification',
    TO_BE_TAKEN = 'A recupérer'
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
    note:string,
    reparationDuration: string,
    supervisor:string | User,
}
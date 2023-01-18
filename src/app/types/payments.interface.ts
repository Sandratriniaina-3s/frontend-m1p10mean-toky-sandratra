import { Car } from "./car.interface";
import { Repair } from "./repairs.interface";
import { User } from "./user.interface";

export interface Payment{
    _id:string,
    repair: string | Repair,
    amount: number,
}

export enum PaymentStatus{
    UNPAID = "Non payé",
    PARTIALLY_PAID = "Partiellement payé",
    PAID = "Payé",
}

export interface Bill{
    _id:any,
    repair: string | Repair,
    car:string | Car,
    client: string | User,
    amount:number,
}
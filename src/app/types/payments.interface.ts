import { Car } from "./car.interface";
import { Repair } from "./repairs.interface";
import { User } from "./user.interface";

export interface Payment{
    _id:string,
    repair: string | Repair,
    amount: number,
    createdAt: Date,
}

export enum PaymentStatus{
    UNPAID = "Non paye",
    PARTIALLY_PAID = "Partiellement paye",
    PAID = "Paye",
}

export interface Bill{
    _id:any,
    date:Date,
    repair: string | Repair,
    car:string | Car,
    client: string | User,
    totalAmount:number,
}

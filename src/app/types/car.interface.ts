import {User} from './user.interface';

export interface Car{
    _id:any,
    brand:string,
    model:string,
    registration:string,
    isInReparation:boolean,
    client:string | User
}

export interface Criteria{
    search:string,
}
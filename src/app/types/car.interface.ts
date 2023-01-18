import {User} from './user.interface';

export interface Car{
    _id:any,
    brand:string,
    registration:string,
    client:string | User
}
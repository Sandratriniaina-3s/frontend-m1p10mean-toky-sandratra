export enum UserRole{
    CLIENT = "Client",
    RESPONABLE_FINANCIER = "Responsable financier",
    RESPONABLE_ATELIER = "Responsable atelier"
}

export interface User{
    _id:any,
    firstName:string,
    lastName:string,
    fullName:string,
    email:string,
    telephone:string,
    login:string,
    password:string,
    role: UserRole
}

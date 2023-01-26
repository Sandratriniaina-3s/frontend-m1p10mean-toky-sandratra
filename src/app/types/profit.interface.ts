export interface Expenses{
    [kay:string] : number;
}

export interface Profit{
    _id:any;
    salary:number;
    loan:number,
    purchases:number,
    others:number,
    amount:number,
    date:string,
    createdAt:Date,
}

export const EMPTY_PROFIT :Profit = {
    _id:null,
    salary:0,
    loan:0,
    purchases:0,
    others:0,
    amount:0,
    date:'',
    createdAt:new Date()
}
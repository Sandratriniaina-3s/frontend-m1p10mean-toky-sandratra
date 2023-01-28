import { Pipe, PipeTransform } from "@angular/core";
import { Car } from "../types/car.interface";

@Pipe({
    name:'castToCar',
})

export class CastToCarPipe implements PipeTransform{
    transform(value:any):Car {
        return value as Car;
    }
}
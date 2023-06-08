import {IsNotEmpty} from "class-validator";

export class CatDTO {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    age: number;
    @IsNotEmpty()
    breed: string;
}
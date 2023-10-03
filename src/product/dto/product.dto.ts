import {IsNotEmpty,IsNumber,IsString, Max, Min} from 'class-validator'
export class ProductDto{
    public id:number;

    @IsNotEmpty()
    @IsString()
    public product_name:string;

    @IsNotEmpty()
    @IsString()
    public product_model:string;

    @IsNumber()
    @Min(2000)
    @Max(new Date().getFullYear())
    public release_year:number;

    @IsNumber()
    public price:number;

    @IsNumber()
    @Min(0)
    public categoryId:number;
}
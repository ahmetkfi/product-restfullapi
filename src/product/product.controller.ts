import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto } from "./dto/product.dto";
import {Response,Request} from 'express';
@Controller('products')
export class ProductController{
    constructor(private productService:ProductService){}
    /* localhost:3000/product post request */
    @Post()
    addProduct(@Req() req:Request,@Res() res:Response,@Body() dto:ProductDto){
        return this.productService.addProduct(dto,req,res);
    }
    /* localhost:3000/product get request... this action is get all products */
    @Get()
    getProducts(){
        return this.productService.getPorducts();
    }

    /* localhost:3000/product/:id get request... .this action will getting :id product */
    @Get(':id')
    getProduct(@Param() params:{id:string}){
       return this.productService.getPorduct(params.id);
    }
    @Delete(':id')
    deleteProduct(@Param() params:{id:string}){
        return this.productService.deleteProduct(params.id);
    }
    @Put(':id')
    updateProduct(@Param() params:{id:string},@Body() dto:ProductDto){
        return this.productService.updateProduct(params.id,dto);
    }

    /* localhost:3000/product/category/:categoryname get request... .this action will getting  products as category name */
    @Get('category/:category_name')
    getProdcutAsCategoryName(@Param() params:{category_name:string}){
        return this.productService.getProductAsCategoryName(params.category_name);
    }
    

}
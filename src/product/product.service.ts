import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { ProductDto } from "./dto/product.dto";
import {Request,Response} from 'express'
import { NotFoundError } from "rxjs";

@Injectable()
export class ProductService{
    constructor(private prisma:PrismaService){}
async addProduct(dto:ProductDto,req:Request,res:Response){
    const {product_name,product_model,release_year,price,categoryId}=dto;
    await this.prisma.product.create({
        data:{
            product_name,
            product_model,
            release_year,
            price,
            categoryId,
        }
    });
    res.status(202);
    res.send(`${product_model} başarılı bir şekilde veritabanına eklendi`); 
}
async getPorducts(){
    return this.prisma.product.findMany();
}
async getPorduct(id:string){
    const numericId:number=parseInt(id,10);
    const product= await this.prisma.product.findUnique({where:{id:numericId}});
    if(!product){
        throw new NotFoundException();
    }
    return product;
}

async getProductAsCategoryName(categoryName:string){
    const category=await this.prisma.category.findMany({where:{category_name:categoryName.toLowerCase()}});
    if(!category){
        throw new NotFoundException();
    }
    const products=await this.prisma.product.findMany({where:{categoryId:category[0].id}});
    return products;
}

async deleteProduct(id:string){
    const numericId:number=parseInt(id,10);
    const deletedProduct= await this.prisma.product.delete({where:{id:numericId}});
    return deletedProduct+ `
    deletion successful `;
}
async updateProduct(id:string,dto:ProductDto){
    const numericId:number=parseInt(id,10);
    const updateData=dto;
    const updatedProduct=await this.prisma.product.update({where:{id:numericId},data:updateData});

    return updatedProduct;
}


}
import { ProductDto } from "../../dtos/product/product-create.dto";
import { ProductRepository } from "../../repositories/product.repository";


interface Product {
    title: string;
    description: string;
    cost: number;
    tax: number;
    price: number
    
}

interface CreateProductUseCase {
    execute( productDto: ProductDto ): Promise<Product>
}

export class CreateProduct implements CreateProductUseCase {

    constructor(
        private readonly productRepository: ProductRepository
    ){}


    async execute(productDto: ProductDto): Promise<Product> {
        const { cost, tax } = productDto;
        const price = ( cost * (tax / 100) ) + cost;
        const product =  await this.productRepository.createProduct({...productDto, price});

        return {
            title: product.title,
            description: product.description,
            cost: product.cost,
            tax: product.tax,
            price: product.price
        }

    }



}
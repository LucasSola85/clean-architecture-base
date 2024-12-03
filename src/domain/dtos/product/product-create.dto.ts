




export class ProductDto {

    private constructor(
        public title: string,
        public description: string,
        public cost: number,
        public tax: number,
        public price?: number,
    ){}


    static create( object: { [key: string]: any } ): [ string?, ProductDto? ] {

        const { title, description, cost, tax, price } = object

        if(!title) return ['Title is required'];
        if(!description || description.length < 6) return ['Please, give a description (min length 6 characters)'];
        if(!cost || isNaN(cost)) return ['Cost must be required and type number'];
        if(!tax || isNaN(tax)) return ['Tax must be required and type number'];

        return [undefined, new ProductDto(title, description, cost, tax, price)]
    }



}
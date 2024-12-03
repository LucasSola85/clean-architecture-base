import { CustomError } from "../../domain";
import { ProductEntity } from "../../domain/entities/product.entity";


export class ProductMapper {


    static productEntityFromObject( object: {[key:string]: any} ): ProductEntity {

        const { id, _id, title, description, cost, tax, price } = object;

        if ( !_id || !id ) {
          throw CustomError.badRequest('Missing id');
        }
    
        if ( !title ) throw CustomError.badRequest('Missing title');
        if ( !description ) throw CustomError.badRequest('Missing description');
        if ( !cost ) throw CustomError.badRequest('Missing cost');
        if ( !tax ) throw CustomError.badRequest('Missing tax');    
    
        return new ProductEntity(
          _id || id,
          title,
          description,
          cost,
          tax,
          price
        );
      }

}
import { Response } from "express";
import { CustomError } from "../../domain";



export class HandlerError {

    static launch( error: unknown, res: Response ){
        if( error instanceof CustomError ){
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log('Err', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }


}
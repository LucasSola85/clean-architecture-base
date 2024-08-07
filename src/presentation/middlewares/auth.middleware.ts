import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../databases";


export class AuthMiddleware {


    static async validateJWT(req: Request, resp: Response, next: NextFunction) {
        
        const authorization = req.header('Authorization');
        
        if(!authorization) return resp.status(401).json({ error: 'Token not provided' });
        if(!authorization.startsWith('Bearer ')) return resp.status(401).json({ error: 'Bearer token not provided' });

        const token = authorization.split(" ").at(1);

        try {

            const payload = await JwtAdapter.validateToken<{ id: string }>(token!);
            if(!payload) return resp.status(401).json({ error: 'Token not valid' });

            const user = await UserModel.findById( payload.id );
            if( !user ) return resp.status(401).json({ error: 'Token not valid - user not found' });

            req.body.user = user

            return next();
            
        } catch (error) {
            console.log(error);
            resp.status(500).json({ error: 'Iternal Server Error' })
            
        }



        return next();
    }

}
import { Router } from "express"
import { AuthControler } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares";


export class AuthRoutes {

    static get routes(): Router {
    
        const router = Router();

        const dataSource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(dataSource);

        const controller = new AuthControler(authRepository);

        router.post('/register', controller.userRegister);
        router.post('/login', controller.userLogin);
        
        router.get('/', AuthMiddleware.validateJWT ,controller.getUsers);

        return router;

    }


}
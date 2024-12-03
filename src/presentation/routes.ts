import { Router } from "express"
import { AuthRoutes } from "./auth/routes";
import { ProductRoutes } from "./products/routes";


export class AppRoutes {

    static get routes() : Router{
    
        const router = Router();

        //? Definicion del inicio del segmento referente a /api/auth
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/product', ProductRoutes.routes ); 

        //! esto tambien aplican para otras rutas.
        // router.use('/api/billing', BillRoutes.routes)
        // router.use('/api/customer', CustomerRoutes.routes)
        // router.use('/api/checkout', CheckoutRoutes.routes)

        return router;



    }


}
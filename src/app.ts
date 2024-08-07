
import { envs } from "./config";
import { MongoDatabase } from "./databases";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";



(
    ()=>{
        main();
    }
)()



async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGON_DBNAME
    })

    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start();
    
}
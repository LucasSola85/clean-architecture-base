import { get } from "env-var"
import 'dotenv/config';



export const envs = {

    PORT: get('PORT').required().asPortNumber(),
    
    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGON_DBNAME: get('MONGON_DBNAME').required().asString(),

    JWT_SEED: get('JWT_SEED').required().asString(),


}



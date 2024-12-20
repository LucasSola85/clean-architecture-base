import express, { Router } from 'express';


interface Options {
    port: number,
    routes: Router;
}

export class Server {

    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(  options: Options ){
        const { port, routes } = options;
        this.port = port;
        this.routes = routes

    }


    async start() {

        //middlewares express para tolerar body
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true })); // x-www-url-encoded
        

        this.app.use( this.routes )

        this.app.listen(this.port, ()=>{
            console.log(`App listen on port ${this.port}`)
        });
    }


}
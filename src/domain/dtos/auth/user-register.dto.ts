import { Validators } from "../../../config";



export class UserRegisterDto {


    private constructor(
        public name: string,
        public email: string,
        public password: string
    ){}


    static create( object: {[key:string]: any}): [string?, UserRegisterDto?]{

        const { name, email, password } = object;

        if(!name) return ['Missing name'];
        if(!email) return ['Missing email'];
        if(!Validators.email.test(email)) return ['Email is not valid'];
        if(!password) return ['Password is required'];
        if(password.length < 6) return ['Password is too short'];

        return [
            undefined,
            new UserRegisterDto( name, email, password )
        ]
    }

}
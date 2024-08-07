import { Request, Response } from "express";
import { AuthRepository, RegisterUser, UserRegisterDto } from "../../domain";
import { HandlerError } from "../errors/handler.error";
import { UserModel } from "../../databases";
import { LoginUserDto } from "../../domain/dtos/auth/user-login.dto";
import { LoginUser } from "../../domain/uses-cases/auth/login-user.use-case";

export class AuthControler {

    constructor(
        private readonly authRepository: AuthRepository,
      ) {}

    userLogin = (req: Request, resp: Response) => {
        const [error, loginUserDto] = LoginUserDto.login(req.body);
        if( error ) return resp.status(400).json( error );

        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then((data) => resp.status(200).json(data))
            .catch((error) => HandlerError.launch(error, resp))

    }

    userRegister = (req: Request, resp: Response) => {
        const [ error, registerUserDto ] = UserRegisterDto.create(req.body);
        if( error ) return resp.status(400).json( error );

        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then((data) => resp.status(200).json(data))
            .catch((error) => HandlerError.launch(error, resp))

    }


    getUsers = (req: Request, resp: Response) => {

        UserModel.find()
            .then(users => resp.status(200).json( { 
                users,
                token: req.body.user
             } ))
            .catch(error => resp.status(500).json({ error: 'Internal Server Error' }))

    }

}
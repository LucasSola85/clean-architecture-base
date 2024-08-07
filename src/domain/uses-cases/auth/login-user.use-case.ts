import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/user-login.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";


interface UserToken {
    token: string;
    user: {
        id: string,
        name: string,
        email: string
    };
}

type LoginToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
    execute( loginUserDto: LoginUserDto ): Promise<UserToken>
}

export class LoginUser implements LoginUserUseCase {

    //DI necesito dos dependencias. 1. para hacer el login, 2. para firmar un token
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly loginToken: LoginToken = JwtAdapter.generateToken
    ){}
    
    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        const user  = await this.authRepository.login(loginUserDto);
        
        const token = await this.loginToken({ id: user.id }, '2h');
        if(!token) throw new CustomError(500, 'Error generating token');

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token: token,
        }

    }
}
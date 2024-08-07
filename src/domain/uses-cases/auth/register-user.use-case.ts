import { emitWarning } from "process";
import { UserRegisterDto } from "../../dtos/auth/user-register.dto";
import { AuthRepository } from "../../repositories/auth.repository";
import { CustomError } from "../../errors/custom.error";
import { JwtAdapter } from "../../../config";


interface UserToken {
    token: string;
    user: {
        id: string,
        name: string,
        email: string
    };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUserUseCase {
    execute( userRegisterDto: UserRegisterDto ): Promise<UserToken>
}

export class RegisterUser implements RegisterUserUseCase{
    
    //DI
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ){}
    
    
    //METHOD
    async execute(userRegisterDto: UserRegisterDto): Promise<UserToken> {
        const user = await this.authRepository.register(userRegisterDto);

        const token = await this.signToken({id: user.id}, '2h');
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
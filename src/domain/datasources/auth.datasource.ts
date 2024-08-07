import { LoginUserDto } from "../dtos/auth/user-login.dto";
import { UserRegisterDto } from "../dtos/auth/user-register.dto";
import { UserEntity } from "../entities/user.entity";


//! Aqui definimos las reglas de negocio.

export abstract class AuthDatasource {

    abstract login( loginUserDto: LoginUserDto ): Promise<UserEntity>;

    abstract register( userRegisterDto: UserRegisterDto ): Promise<UserEntity>

}
import { AuthRepository, UserEntity, UserRegisterDto } from "../../domain";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/user-login.dto";



export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDatasource: AuthDatasource
    ){}
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto);
    }
    
    async register(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
        return this.authDatasource.register(userRegisterDto);
    }

}
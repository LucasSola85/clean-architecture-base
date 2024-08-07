import { BcryptAdapter } from "../../config/bcrypt";
import { UserModel } from "../../databases";
import { AuthDatasource, CustomError, UserEntity, UserRegisterDto } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/user-login.dto";
import { UserMapper } from "../mappers/user.mapper";


type HashPassword = (password: string) => string;
type ComparePassword = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashPassword = BcryptAdapter.hash,
        private readonly comparePassword: ComparePassword = BcryptAdapter.compare
    ){}

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const { email, password } = loginUserDto;

        try {

            // buscamos el usuario por correo
            const usuario = await UserModel.findOne({ email });
            if(!usuario) throw CustomError.badRequest('user not exist');

            const { password: passwordDB, ...rest } = usuario;

            // comparamos sus password
            const isSamePassword = this.comparePassword(password, passwordDB);
            if(!isSamePassword) throw CustomError.unauthorized('user or password no valid')

            // retornamos usuario
            return UserMapper.userEntityFromObject(usuario);
            
        } catch (error) {
            console.log(error);
            if(error instanceof CustomError){
                throw error;
            }

            throw CustomError.internalServer();

        }

    }

    async register(userRegisterDto: UserRegisterDto): Promise<UserEntity> {

        const { name, email, password } = userRegisterDto;
        
        try{

            const emailExist = await UserModel.findOne({ email: email });
            
            if ( emailExist ) throw CustomError.badRequest('User already exist');

            const newUser = await UserModel.create({
                name,
                email,
                password: this.hashPassword(password),
            })
        
            return UserMapper.userEntityFromObject(newUser);

        }catch(error){

            if(error instanceof CustomError){
                throw error;
            }

            throw CustomError.internalServer();


        }


    }

}
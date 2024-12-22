import { AuthService } from '@src/auth/auth.service';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(createUserDto: CreateUserDto): Promise<import("../user/entity/user.entity").User>;
    loginUser(createUserDto: Omit<CreateUserDto, 'passwordCheck'>): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
    rotateAccessToken(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}

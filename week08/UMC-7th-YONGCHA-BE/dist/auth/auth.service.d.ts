import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '@src/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly configService;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, configService: ConfigService, jwtService: JwtService);
    parseBearerToken(rawToken: string, isRefreshToken: boolean): Promise<any>;
    issueToken(user: {
        id: number;
        email: string;
    }, isRefreshToken: boolean): Promise<string>;
    register(createUserDto: CreateUserDto): Promise<User>;
    login(createUserDto: Omit<CreateUserDto, 'passwordCheck'>): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../user/entity/user.entity");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, configService, jwtService) {
        this.userRepository = userRepository;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async parseBearerToken(rawToken, isRefreshToken) {
        const bearerSplit = rawToken.split(' ');
        if (bearerSplit.length !== 2) {
            throw new common_1.BadRequestException('잘못된 형태의 토큰입니다.');
        }
        const [bearer, token] = bearerSplit;
        if (bearer.toLowerCase() !== 'bearer') {
            throw new common_1.BadRequestException('잘못된 형태의 토큰입니다.');
        }
        const payload = await this.jwtService.verifyAsync(token, {
            secret: isRefreshToken ? 'matthew' : 'matthew',
        });
        if (isRefreshToken) {
            if (payload.type !== 'refresh') {
                throw new common_1.BadRequestException('Refresh 토큰을 입력해주세요.');
            }
        }
        else {
            if (payload.type !== 'access') {
                throw new common_1.BadRequestException('Access 토큰을 입력해주세요.');
            }
        }
        return payload;
    }
    async issueToken(user, isRefreshToken) {
        const refreshTokenSecret = 'matthew';
        const accessTokenSecret = 'matthew';
        return this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            type: isRefreshToken ? 'refresh' : 'access',
        }, {
            secret: isRefreshToken ? refreshTokenSecret : accessTokenSecret,
            expiresIn: isRefreshToken ? '24h' : 300,
        });
    }
    async register(createUserDto) {
        console.log(createUserDto);
        const { email, password, passwordCheck } = createUserDto;
        if (password !== passwordCheck) {
            throw new common_1.BadRequestException('비밀번호가 일치하지 않습니다.');
        }
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (user) {
            throw new common_1.BadRequestException('이미 가입한 이메일 입니다.');
        }
        const hash = await bcrypt.hash(password, 10);
        await this.userRepository.save({
            email,
            password: hash,
        });
        return this.userRepository.findOne({
            where: { email },
        });
    }
    async login(createUserDto) {
        const { email, password } = createUserDto;
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('잘못된 로그인 정보입니다!');
        }
        const passOk = await bcrypt.compare(password, user.password);
        if (!passOk) {
            throw new common_1.BadRequestException('잘못된 로그인 정보입니다!');
        }
        return {
            refreshToken: await this.issueToken(user, true),
            accessToken: await this.issueToken(user, false),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
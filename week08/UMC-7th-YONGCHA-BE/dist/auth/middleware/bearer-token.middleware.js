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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BearerTokenMiddleware = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let BearerTokenMiddleware = class BearerTokenMiddleware {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async use(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            next();
            return;
        }
        const token = this.validateBearerToken(authHeader);
        try {
            const decodedPayload = this.jwtService.decode(token);
            if (decodedPayload.type !== 'refresh' &&
                decodedPayload.type !== 'access') {
                throw new common_1.UnauthorizedException('잘못된 토큰입니다!');
            }
            const payload = await this.jwtService.verifyAsync(token, {
                secret: decodedPayload.type === 'refresh' ? 'matthew' : 'matthew',
            });
            req.user = payload;
            next();
        }
        catch (e) {
            throw new common_1.UnauthorizedException('토큰이 만료됐습니다!');
        }
    }
    validateBearerToken(rawToken) {
        console.log(rawToken);
        const bearerSplit = rawToken.split(' ');
        if (bearerSplit.length !== 2) {
            throw new common_1.BadRequestException('토큰 포맷이 잘못됐습니다!');
        }
        const [bearer, token] = bearerSplit;
        if (bearer.toLowerCase() !== 'bearer') {
            throw new common_1.BadRequestException('잘못된 형태의 토큰입니다.');
        }
        return token;
    }
};
exports.BearerTokenMiddleware = BearerTokenMiddleware;
exports.BearerTokenMiddleware = BearerTokenMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], BearerTokenMiddleware);
//# sourceMappingURL=bearer-token.middleware.js.map
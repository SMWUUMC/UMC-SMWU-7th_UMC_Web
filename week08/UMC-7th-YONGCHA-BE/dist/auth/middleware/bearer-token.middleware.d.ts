import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
export declare class BearerTokenMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    validateBearerToken(rawToken: string): string;
}

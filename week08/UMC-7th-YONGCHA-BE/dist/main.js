"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('UMC 7th WEB 워크북 API')
        .setDescription('Auth / Todo 관련 API')
        .setVersion('1.0')
        .addBearerAuth()
        .addBasicAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('doc', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
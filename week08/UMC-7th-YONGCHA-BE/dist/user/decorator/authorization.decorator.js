"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
const common_1 = require("@nestjs/common");
exports.Authorization = (0, common_1.createParamDecorator)((data, context) => {
    const req = context.switchToHttp().getRequest();
    return req.headers['authorization'];
});
//# sourceMappingURL=authorization.decorator.js.map
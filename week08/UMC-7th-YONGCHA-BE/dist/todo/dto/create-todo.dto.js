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
exports.CreateTodoDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateTodoDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, content: { required: true, type: () => String }, checked: { required: true, type: () => Boolean } };
    }
}
exports.CreateTodoDto = CreateTodoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'ToDo의 제목을 입력해주세요.',
        example: '고구마 아이스크림 구매하기!',
    }),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Todo의 내용 입력해주세요.',
        example: '근데 어디서 팔까요?',
    }),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Todo를 했는지, 안했는지 여부를 작성해주세요.',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTodoDto.prototype, "checked", void 0);
//# sourceMappingURL=create-todo.dto.js.map
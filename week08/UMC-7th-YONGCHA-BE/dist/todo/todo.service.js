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
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("./entity/todo.entity");
let TodoService = class TodoService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async create(createTodoDto) {
        return this.todoRepository.save(createTodoDto);
    }
    async findAll(title) {
        const todo = this.todoRepository.createQueryBuilder('todo');
        if (title) {
            todo.where('todo.title LIKE :title', { title: `%${title}%` });
        }
        return await todo.getManyAndCount();
    }
    async findOne(id) {
        const todo = await this.todoRepository
            .createQueryBuilder('todo')
            .where('id = :id', { id })
            .getOne();
        if (!todo) {
            throw new common_1.NotFoundException(`${id}번 아이디에 해당하는 todo가 존재하지 않습니다.`);
        }
        return todo;
    }
    async update(id, updateTodoDto) {
        const todo = await this.todoRepository
            .createQueryBuilder('todo')
            .where('id = :id', { id })
            .getOne();
        if (!todo) {
            throw new common_1.NotFoundException(`${id}번 아이디에 해당하는 todo가 존재하지 않습니다.`);
        }
        await this.todoRepository
            .createQueryBuilder('todo')
            .update(todo_entity_1.Todo)
            .set(updateTodoDto)
            .where('id = :id', { id })
            .execute();
        return `This action updates a #${id} todo`;
    }
    async remove(id) {
        const todo = await this.todoRepository.findOne({
            where: {
                id,
            },
        });
        if (!todo) {
            throw new common_1.NotFoundException(`${id}번 아이디에 해당하는 todo가 존재하지 않습니다.`);
        }
        await this.todoRepository
            .createQueryBuilder('todo')
            .delete()
            .from(todo_entity_1.Todo)
            .where('id = :id', { id })
            .execute();
        return `${id}번의 todo를 삭제했습니다.`;
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.Todo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TodoService);
//# sourceMappingURL=todo.service.js.map
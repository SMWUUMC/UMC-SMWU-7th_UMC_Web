import { TodoService } from '@src/todo/todo.service';
import { CreateTodoDto } from '@src/todo/dto/create-todo.dto';
import { UpdateTodoDto } from '@src/todo/dto/update-todo.dto';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    create(createTodoDto: CreateTodoDto): Promise<CreateTodoDto & import("./entity/todo.entity").Todo>;
    findAll(title?: string): Promise<[import("./entity/todo.entity").Todo[], number]>;
    findOne(id: string): Promise<import("./entity/todo.entity").Todo>;
    update(id: string, updateTodoDto: UpdateTodoDto): Promise<string>;
    remove(id: string): Promise<string>;
}

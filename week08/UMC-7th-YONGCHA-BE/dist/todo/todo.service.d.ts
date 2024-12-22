import { Repository } from 'typeorm';
import { Todo } from '@src/todo/entity/todo.entity';
import { CreateTodoDto } from '@src/todo/dto/create-todo.dto';
import { UpdateTodoDto } from '@src/todo/dto/update-todo.dto';
export declare class TodoService {
    private readonly todoRepository;
    constructor(todoRepository: Repository<Todo>);
    create(createTodoDto: CreateTodoDto): Promise<CreateTodoDto & Todo>;
    findAll(title?: string): Promise<[Todo[], number]>;
    findOne(id: number): Promise<Todo>;
    update(id: number, updateTodoDto: UpdateTodoDto): Promise<string>;
    remove(id: number): Promise<string>;
}

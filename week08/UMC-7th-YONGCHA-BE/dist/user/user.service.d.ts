import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly userReposiotry;
    constructor(userReposiotry: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}

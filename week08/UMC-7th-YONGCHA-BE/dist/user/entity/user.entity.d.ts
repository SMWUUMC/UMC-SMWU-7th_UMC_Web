import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: number;
    email: string;
    password: string;
}

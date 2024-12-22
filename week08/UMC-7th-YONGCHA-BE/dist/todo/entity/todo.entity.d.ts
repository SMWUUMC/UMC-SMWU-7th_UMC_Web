import { BaseTable } from '@src/common/entity/base-table.entity';
export declare class Todo extends BaseTable {
    id: number;
    title: string;
    content: string;
    checked?: boolean;
}

import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity('blog')
export class Blog{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;
    
    @Column()
    content: string;
}
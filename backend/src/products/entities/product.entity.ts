import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Category, category => category.products, {eager: true})
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column({unique: true})
    sku: string;

    @Column()
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column()
    weight: number;

    @Column()
    width: number;

    @Column()
    length: number;

    @Column()
    height: number;

    @Column({nullable: true})
    image?: string;

    @Column()
    price: number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}

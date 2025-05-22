import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  stock: number;

  @Column()
  imageB64: string;

  @Column()
  category: string;

  @Column({ default: true })
  isAvailable: boolean;
}

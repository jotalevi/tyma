import { User } from 'modules/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { SaleItem } from './saleItem.entity';
import { SaleStatus } from './salestatus.enum';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SaleStatus, default: SaleStatus.ON_CART })
  status: SaleStatus;

  @Column({ type: 'decimal', default: 0 })
  total: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.sales, { nullable: true })
  user: User;

  @OneToMany(() => SaleItem, (item) => item.sale, { cascade: true })
  items: SaleItem[];
}

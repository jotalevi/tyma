import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Sale } from './sale.entity';
import { Product } from 'modules/product/product.entity';

@Entity()
export class SaleItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Sale, (sale) => sale.items, { onDelete: 'CASCADE' })
    sale: Sale;

    @ManyToOne(() => Product)
    product: Product;

    @Column()
    quantity: number;

    @Column({ type: 'decimal' })
    priceAtPurchase: number;
}

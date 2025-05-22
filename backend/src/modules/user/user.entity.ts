import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Sale } from "modules/sale/sale.entity";

@Entity()
export class User {
  @PrimaryColumn()
  rut: number;

  @Column({ length: 1 })
  dv: string;

  @Column({ length: 250 })
  names: string;

  @Column({ length: 250 })
  surnames: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  role: 'admin' | 'user' | 'superadmin';

  @Column({ default: false })
  requiresPasswordReset: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)"
  })
  updatedAt: Date;

  // Relationships
  @OneToMany(() => Sale, (sale) => sale.user, { nullable: true})
  sales: Sale[];

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password); // hashedPassword is the stored hash
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

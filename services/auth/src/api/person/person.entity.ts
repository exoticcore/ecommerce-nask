import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../../database/address.entity';

@Entity({ name: 'person' })
export class Person {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: true, type: 'varchar' })
  public firstName: string | null;

  @Column({ nullable: true, type: 'varchar' })
  public lastName: string | null;

  @Column({ nullable: false, unique: true })
  public email: string;

  @Column({ type: 'text', nullable: true, unique: true })
  public phone: string | null;

  @Column({ type: 'text', nullable: true })
  public picture: string | null;

  @CreateDateColumn()
  public createdAt: Date;

  @OneToMany(() => Address, (address) => address.person, { nullable: true })
  public addresses?: Address[];
}

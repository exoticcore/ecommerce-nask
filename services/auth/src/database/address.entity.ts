import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Person } from '../api/person/person.entity';

@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false, type: 'varchar' })
  public fullname: string;

  @Column({ nullable: false, type: 'varchar', length: 15 })
  public phone: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  public region: string;

  @Column({ nullable: false, type: 'text' })
  public address1: string;

  @Column({ nullable: true, type: 'text' })
  public address2: string;

  @Column({ nullable: false, type: 'varchar', length: 10 })
  public postalCode: string;

  @Column({ nullable: false, type: 'bool', default: false })
  public activated: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => Person, (person) => person.addresses, { nullable: false })
  public person: Person;
}

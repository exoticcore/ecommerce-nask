import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../api/emp/emp.entity';
import { Permission } from './permission.entity';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  public title: string;

  @OneToMany(() => Permission, (permission) => permission.role, {
    nullable: true,
  })
  public permissions: Permission[];
}

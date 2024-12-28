import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from '../emp/emp.entity';

@Entity({ name: 'employeeSession' })
export class EmployeeSession {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false, type: 'text', unique: true })
  public refreshToken: string;

  @Column({ nullable: true, type: 'varchar' })
  public ip?: string | null;

  @Column({ nullable: true, type: 'varchar' })
  public device?: string | null;

  @Column({ nullable: true, type: 'varchar' })
  public userAgent?: string | null;

  @Column({ nullable: true, type: 'varchar' })
  public timezone?: string | null;

  @Column({ nullable: false, type: 'bool', default: false })
  public revoked: boolean;

  @Column({ nullable: false, type: 'timestamptz' })
  public activeAt: Date;

  @Column({ nullable: false, type: 'timestamptz' })
  public maxAge: Date;

  @CreateDateColumn()
  public createdAt: string;

  @ManyToOne(() => Employee, (emp) => emp.empSession, { nullable: false })
  public employee: Employee;
}

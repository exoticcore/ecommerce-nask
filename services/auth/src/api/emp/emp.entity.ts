import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Person } from '../person/person.entity';
import { EmployeeSession } from '../emp-session/emp-session.entity';
import { Role } from '../../database/role.entity';

@Entity({ name: 'employee' })
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false, type: 'varchar' })
  public password: string;

  @Column({ nullable: false, type: 'bool', default: false })
  public mfa: boolean;

  @Column({ nullable: false, type: 'bool', default: false })
  public isVerified: boolean;

  @Column({ nullable: false, type: 'bool', default: false })
  public blocked: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToOne(() => Person, { nullable: false })
  @JoinColumn()
  public person: Person;

  @OneToMany(() => EmployeeSession, (empSession) => empSession.employee, {
    nullable: true,
  })
  public empSession?: EmployeeSession[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}

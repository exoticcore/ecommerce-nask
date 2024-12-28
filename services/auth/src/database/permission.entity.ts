import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Scope } from './scope.entity';
import { Service } from './service.entity';
import { Role } from './role.entity';
import { AccessType } from './access-type.entity';

@Entity({ name: 'permission' })
export class Permission {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @ManyToOne(() => Scope, (scope) => scope.permissions, { nullable: false })
  public scope: Scope;

  @ManyToOne(() => AccessType, (accessType) => accessType.permissions, {
    nullable: false,
  })
  public accessType: AccessType;

  @ManyToOne(() => Role, (role) => role.permissions, { nullable: false })
  public role: Role;
}

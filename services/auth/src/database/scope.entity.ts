import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './permission.entity';

@Entity({ name: 'scope' })
export class Scope {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  public title: string;

  @OneToMany(() => Permission, (permission) => permission.scope, {
    nullable: true,
  })
  public permissions: Permission[];
}

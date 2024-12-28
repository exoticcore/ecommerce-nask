import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Service } from './service.entity';
import { Permission } from './permission.entity';

@Entity({ name: 'accessType' })
@Unique(['title', 'serviceId'])
export class AccessType {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false, type: 'varchar', name: 'title' })
  public title: string;

  @Column({ nullable: false })
  public serviceId: number;

  @ManyToOne(() => Service, (service) => service.accessTypes, {
    nullable: false,
  })
  @JoinColumn({ name: 'serviceId', referencedColumnName: 'id' })
  public service: Service;

  @OneToMany(() => Permission, (permission) => permission.accessType, {
    nullable: true,
  })
  public permissions?: Permission[];
}

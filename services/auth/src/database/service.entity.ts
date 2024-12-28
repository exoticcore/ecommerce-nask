import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './permission.entity';
import { AccessType } from './access-type.entity';

@Entity({ name: 'service' })
export class Service {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  public name: string;

  @OneToMany(() => AccessType, (accessType) => accessType.service, {
    nullable: true,
  })
  public accessTypes?: AccessType[];
}

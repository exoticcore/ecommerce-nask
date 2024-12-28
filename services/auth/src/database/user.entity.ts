import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSession } from '../api/user-session/user-session.entity';
import { Person } from '../api/person/person.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true, type: 'varchar' })
  public password: string | null;

  @Column({ nullable: false, type: 'bool', default: false })
  public isVerified: boolean;

  @Column({ nullable: false, type: 'bool', default: false })
  public blocked: boolean;

  @Column({ nullable: false, type: 'varchar', default: 'user' })
  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToOne(() => Person, { nullable: false })
  @JoinColumn()
  person: Person;

  @OneToMany(() => UserSession, (userSession) => userSession.user, {
    nullable: true,
  })
  userSession?: UserSession[];
}

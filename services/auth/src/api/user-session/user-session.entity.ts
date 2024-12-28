import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../database/user.entity';

@Entity({ name: 'userSession' })
export class UserSession {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false, type: 'text' })
  public refreshToken: string;

  @Column({ nullable: false, type: 'boolean', default: false })
  public revoked: boolean;

  @Column({ nullable: true, type: 'varchar' })
  public device: string | null;

  @Column({ nullable: true, type: 'varchar' })
  public userAgent: string | null;

  @Column({ nullable: true, type: 'varchar' })
  public timezone: string | null;

  @Column({ nullable: true, type: 'varchar' })
  public ip: string | null;

  @Column({ nullable: true, type: 'timestamptz' })
  public activeAt: Date | null;

  @CreateDateColumn()
  public createAt: Date;

  @ManyToOne(() => User, (user) => user.userSession, { nullable: false })
  public user: User;
}

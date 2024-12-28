import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Image {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  large_name: string;

  @Column()
  medium_name: string;

  @Column()
  small_name: string;

  @Column()
  detail: string;

  @Column()
  description: string;

  @Column()
  filetype: string;

  @Column()
  path: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column()
  created_by?: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Version } from '../versions/version.entity';
import { Revision } from '../revisions/revision.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Version, (version) => version.notes, { onDelete: 'CASCADE' })
  version: Version;

  @OneToMany(() => Revision, (revision) => revision.note)
  revisions: Revision[];
}

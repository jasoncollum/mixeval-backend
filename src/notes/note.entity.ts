import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Version } from '../versions/version.entity';
import { Revision } from '../revisions/revision.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => Version, (version) => version.notes, { eager: false })
  version: Version;

  @OneToMany(() => Revision, (revision) => revision.note)
  revisions: Revision[];
}

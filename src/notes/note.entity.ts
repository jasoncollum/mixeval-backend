import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Version } from '../versions/version.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => Version, (version) => version.notes, { eager: false })
  version: Version;
}

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Song } from '../songs/song.entity';
import { Note } from '../notes/note.entity';

@Entity()
export class Version {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Song, (song) => song.versions, { onDelete: 'CASCADE' })
  song: Song;

  @OneToMany(() => Note, (note) => note.version)
  notes: Note[];
}

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Song } from '../songs/song.entity';
import { Note } from '../notes/note.entity';

@Entity()
export class Version {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @ManyToOne(() => Song, (song) => song.versions, { eager: false })
  song: Song;

  @OneToMany(() => Note, (note) => note.version, { eager: true })
  notes: Note[];
}

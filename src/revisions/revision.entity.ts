import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { Note } from '../notes/note.entity';

@Entity()
export class Revision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  text: string;

  @ManyToOne(() => Note, (note) => note.revisions)
  note: Note;
}

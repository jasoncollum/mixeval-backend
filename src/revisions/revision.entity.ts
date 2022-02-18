import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Note } from '../notes/note.entity';

@Entity()
export class Revision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => Note, (note) => note.revisions, { eager: false })
  note: Note;
}

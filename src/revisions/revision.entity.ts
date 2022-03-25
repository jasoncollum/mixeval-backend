import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Note } from '../notes/note.entity';

@Entity()
export class Revision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Note, (note) => note.revisions, { onDelete: 'CASCADE' })
  note: Note;
}

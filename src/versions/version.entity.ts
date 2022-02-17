import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Song } from '../songs/song.entity';

@Entity()
export class Version {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @ManyToOne(() => Song, (song) => song.versions, { eager: false })
  song: Song;
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../artists/artist.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: true })
  isOpen: boolean;

  @ManyToOne(() => Artist, (artist) => artist.songs, { eager: false })
  artist: Artist;
}

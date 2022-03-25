import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Artist } from '../artists/artist.entity';
import { Version } from '../versions/version.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: true })
  isOpen: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Artist, (artist) => artist.songs, { onDelete: 'CASCADE' })
  artist: Artist;

  @OneToMany(() => Version, (version) => version.song)
  versions: Version[];
}

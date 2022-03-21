import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Song } from '../songs/song.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  image_url: string;

  @ManyToOne(() => User, (user) => user.artists, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Song, (song) => song.artist)
  songs: Song[];
}

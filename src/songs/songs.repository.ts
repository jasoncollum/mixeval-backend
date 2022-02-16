import { ConflictException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateSongDto } from './dtos/create-song.dto';
import { Song } from './song.entity';
import { Artist } from '../artists/artist.entity';

@EntityRepository(Song)
export class SongsRepository extends Repository<Song> {
  async createSong(
    createSongDto: CreateSongDto,
    artist: Artist,
  ): Promise<Song> {
    const song = this.create({
      title: createSongDto.title,
      isOpen: createSongDto.isOpen,
      artist,
    });

    try {
      return await this.save(song);
    } catch (error) {
      throw new ConflictException('Song already exists');
    }
  }

  async updateSong(id: string, attrs: Partial<Song>): Promise<Song> {
    const song = await this.findOne(id);
    if (!song) {
      throw new NotFoundException('Song not found');
    }
    Object.assign(song, attrs);
    return await this.save(song);
  }
}

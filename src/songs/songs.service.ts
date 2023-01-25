import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateSongDto } from './dtos/create-song.dto';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Artist } from '../artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  async createSong(createSongDto: CreateSongDto): Promise<Song> {
    const song = this.songsRepository.create({
      title: createSongDto.title,
      isOpen: createSongDto.isOpen,
      artist: createSongDto.artist,
    });

    try {
      return await this.songsRepository.save(song);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `${createSongDto.artist.name} already has a song titled ${createSongDto.title}`,
        );
      } else {
        return error;
      }
    }
  }

  async updateSong(song: Song, attrs: Partial<Song>): Promise<Song> {
    Object.assign(song, attrs);
    return await this.songsRepository.save(song);
  }

  async deleteSong(id: string): Promise<void> {
    const result = await this.songsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Song not found');
    }
  }
}

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateSongDto } from './dtos/create-song.dto';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  async createSong(createSongDto: CreateSongDto): Promise<Song> {
    const alreadyExists = createSongDto.artist.songs.filter(
      (song) => song.title === createSongDto.title,
    );

    if (alreadyExists.length > 0) {
      throw new ConflictException(
        `${createSongDto.artist.name} already has a song titled ${createSongDto.title}`,
      );
    }

    const song = this.songsRepository.create({
      title: createSongDto.title,
      isOpen: createSongDto.isOpen,
      artist: createSongDto.artist,
    });

    try {
      return await this.songsRepository.save(song);
    } catch (error) {}
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

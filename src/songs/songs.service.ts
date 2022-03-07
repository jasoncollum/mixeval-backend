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
    const song = this.songsRepository.create({
      title: createSongDto.title,
      isOpen: createSongDto.isOpen,
      artist: createSongDto.artist,
    });

    try {
      return await this.songsRepository.save(song);
    } catch (error) {
      throw new ConflictException('Song already exists');
    }
  }

  async getSong(id: string): Promise<Song> {
    const song = await this.songsRepository.findOne(id);
    if (!song) {
      throw new NotFoundException('Song not found');
    }
    return song;
  }

  async updateSong(id: string, attrs: Partial<Song>): Promise<Song> {
    const song = await this.songsRepository.findOne(id);
    if (!song) {
      throw new NotFoundException('Song not found');
    }
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

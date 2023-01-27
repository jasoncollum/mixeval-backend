import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateSongDto } from './dtos/create-song.dto';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VersionsService } from '../versions/versions.service';
// import { Artist } from '../artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
    private readonly versionsService: VersionsService,
  ) {}

  async createSong(createSongDto: CreateSongDto): Promise<Song> {
    const song = this.songsRepository.create({
      title: createSongDto.title,
      isOpen: createSongDto.isOpen,
      artist: createSongDto.artist,
    });

    try {
      const savedSong = await this.songsRepository.save(song);
      // if song successfully created, create mix version 1
      if (savedSong.id) {
        const version1 = await this.versionsService.createVersion({
          number: 1,
          songId: savedSong.id,
          song: savedSong,
        });
        // add versions array including mix version 1 to new song
        savedSong.versions = [version1];
      }
      return savedSong;
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

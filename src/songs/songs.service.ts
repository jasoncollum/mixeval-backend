import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dtos/create-song.dto';
import { Song } from './song.entity';
import { SongsRepository } from './songs.repository';
import { ArtistsRepository } from '../artists/artists.repository';
import { UpdateSongDto } from './dtos/update-song.dto';
import { Artist } from '../artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    private songsRepository: SongsRepository,
    private artistsRepository: ArtistsRepository,
  ) {}

  async createSong(createSongDto: CreateSongDto): Promise<Song> {
    const artist = await this.findArtist(createSongDto.artistId);
    return await this.songsRepository.createSong(createSongDto, artist);
  }

  async getSong(id: string): Promise<Song> {
    const song = await this.songsRepository.findOne(id);
    if (!song) {
      throw new NotFoundException('Song not found');
    }
    return song;
  }

  async updateSong(id: string, updateSongDto: UpdateSongDto): Promise<Song> {
    return await this.songsRepository.updateSong(id, updateSongDto);
  }

  async deleteSong(id: string): Promise<void> {
    const result = await this.songsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Song not found');
    }
  }

  // Find Artist By ID
  async findArtist(artistId: string): Promise<Artist> {
    const result = await this.artistsRepository.find({
      id: artistId,
    });
    if (!result) {
      throw new NotFoundException('Artist not found');
    }
    return result[0];
  }
}

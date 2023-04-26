import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from '../song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SongByIdPipe implements PipeTransform<string, Promise<Song>> {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}
  async transform(value: string): Promise<Song> {
    const song = await this.songsRepository.findOneBy({ id: value });
    if (!song) {
      throw new NotFoundException('Song not found');
    }
    return song;
  }
}

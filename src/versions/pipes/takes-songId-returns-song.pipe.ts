import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from '../../songs/song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TakesSongtIdReturnsSongPipe
  implements PipeTransform<any, Promise<any>>
{
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}
  async transform(value): Promise<Song> {
    const song = await this.songsRepository.findOne({
      where: {
        id: value.songId,
      },
    });
    if (!song) {
      throw new NotFoundException('Song not found');
    }
    value.song = song;
    return value;
  }
}

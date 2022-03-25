import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from '../../songs/song.entity';
import { Repository } from 'typeorm';
import { CreateVersionDto } from '../dtos/create-version.dto';

@Injectable()
export class TakesSongIdReturnsSongPipe
  implements PipeTransform<CreateVersionDto, Promise<CreateVersionDto>>
{
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}
  async transform(value): Promise<CreateVersionDto> {
    const song = await this.songsRepository
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.versions', 'v')
      .where('s.id = :id', { id: value.songId })
      .getOne();

    if (!song) {
      throw new NotFoundException('Song not found');
    }
    value.song = song;
    return value;
  }
}

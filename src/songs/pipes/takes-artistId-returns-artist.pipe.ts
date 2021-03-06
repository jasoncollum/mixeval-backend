import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../../artists/artist.entity';
import { CreateSongDto } from '../dtos/create-song.dto';

@Injectable()
export class TakesArtistIdReturnsArtistPipe
  implements PipeTransform<CreateSongDto, Promise<CreateSongDto>>
{
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}
  async transform(value): Promise<CreateSongDto> {
    const artist = await this.artistsRepository
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.songs', 's')
      .where('a.id = :id', { id: value.artistId })
      .getOne();

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    value.artist = artist;
    return value;
  }
}

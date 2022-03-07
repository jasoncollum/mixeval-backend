import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../../artists/artist.entity';

@Injectable()
export class TakesArtistIdReturnsArtistPipe
  implements PipeTransform<any, Promise<any>>
{
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}
  async transform(value): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({
      where: {
        id: value.artistId,
      },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    value.artist = artist;
    return value;
  }
}

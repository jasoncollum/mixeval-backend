import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { Artist } from '../artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistByIdPipe implements PipeTransform<string, Promise<Artist>> {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}
  async transform(value: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOne(value);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }
}

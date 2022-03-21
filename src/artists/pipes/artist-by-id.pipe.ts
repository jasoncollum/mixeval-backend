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
    const artist = await this.artistsRepository
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.songs', 's')
      .leftJoinAndSelect('s.versions', 'v')
      .leftJoinAndSelect('v.notes', 'n')
      .leftJoinAndSelect('n.revisions', 'r')
      .where('a.id = :id', { id: value })
      .getOne();

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }
}

import { ConflictException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Artist)
export class ArtistsRepository extends Repository<Artist> {
  async createArtist(
    createArtistDto: CreateArtistDto,
    user: User,
  ): Promise<Artist> {
    if (!createArtistDto.image_url) {
      // link to a default image at some point ***
      createArtistDto.image_url = '/default/image_url';
    }
    const artist = this.create({
      ...createArtistDto,
      user,
    });

    try {
      return await this.save(artist);
    } catch (error) {
      throw new ConflictException('Artist already exists');
    }
  }

  async updateArtist(id: string, attrs: Partial<Artist>): Promise<Artist> {
    const artist = await this.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    Object.assign(artist, attrs);
    return await this.save(artist);
  }
}

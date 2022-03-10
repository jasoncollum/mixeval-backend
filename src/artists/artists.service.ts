import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { User } from '../auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async createArtist(
    createArtistDto: CreateArtistDto,
    user: User,
  ): Promise<Artist> {
    if (!createArtistDto.image_url) {
      // link to a default image at some point ***
      createArtistDto.image_url = '/default/image_url';
    }
    const artist = this.artistsRepository.create({
      ...createArtistDto,
      user,
    });

    try {
      return await this.artistsRepository.save(artist);
    } catch (error) {
      throw new ConflictException('Artist already exists');
    }
  }

  async getArtists(user: User): Promise<Artist[]> {
    return await this.artistsRepository.find({ user });
  }

  async updateArtist(artist: Artist, attrs: Partial<Artist>): Promise<Artist> {
    Object.assign(artist, attrs);
    return await this.artistsRepository.save(artist);
  }

  async deleteArtist(artist: Artist): Promise<void> {
    await this.artistsRepository.delete(artist.id);
    return;
  }
}

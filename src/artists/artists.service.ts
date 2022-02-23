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

  async updateArtist(id: string, attrs: Partial<Artist>): Promise<Artist> {
    const artist = await this.artistsRepository.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    Object.assign(artist, attrs);
    return await this.artistsRepository.save(artist);
  }

  async deleteArtist(artistId: string): Promise<string> {
    const result = await this.artistsRepository.delete(artistId);

    if (result.affected === 0) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }

    return 'Artist successfully removed';
  }
}

import { Injectable } from '@nestjs/common';
import { Artist } from './artist.entity';
import { ArtistsRepository } from './artists.repository';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class ArtistsService {
  constructor(private artistsRepository: ArtistsRepository) {}

  async createArtist(
    createArtistDto: CreateArtistDto,
    user: User,
  ): Promise<Artist> {
    return await this.artistsRepository.createArtist(createArtistDto, user);
  }
}

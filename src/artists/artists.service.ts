import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artist.entity';
import { ArtistsRepository } from './artists.repository';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { User } from '../auth/user.entity';
import { UpdateArtistDto } from './dtos/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private artistsRepository: ArtistsRepository) {}

  async createArtist(
    createArtistDto: CreateArtistDto,
    user: User,
  ): Promise<Artist> {
    return await this.artistsRepository.createArtist(createArtistDto, user);
  }

  async getArtists(user: User): Promise<Artist[]> {
    return await this.artistsRepository.find({ user });
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistsRepository.updateArtist(id, updateArtistDto);
  }

  async deleteArtist(artistId: string): Promise<string> {
    const result = await this.artistsRepository.delete(artistId);

    if (result.affected === 0) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }

    return 'Artist successfully removed';
  }
}

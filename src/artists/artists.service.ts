import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { User } from '../auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetArtistsFilterDto } from './dtos/get-artists-filter.dto';

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

  async getArtistsWithFilters(
    filterDto: GetArtistsFilterDto,
    user: User,
  ): Promise<Artist[]> {
    const { hasOpenSongs } = filterDto;

    if (hasOpenSongs) {
      Boolean(hasOpenSongs);
      const Artists = await this.artistsRepository
        .createQueryBuilder('a')
        .leftJoinAndSelect('a.songs', 's')
        .leftJoinAndSelect('s.versions', 'v')
        .leftJoinAndSelect('v.notes', 'n')
        .leftJoinAndSelect('n.revisions', 'r')
        .where('a.userId = :userId', { userId: user.id })
        .andWhere('s.isOpen = :hasOpenSongs', { hasOpenSongs })
        .getMany();

      return Artists;
    } else {
      throw new BadRequestException('hasOpenSongs must be true');
    }
  }

  async getArtists(user: User): Promise<Artist[]> {
    return await this.artistsRepository
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.songs', 's')
      .leftJoinAndSelect('s.versions', 'v')
      .leftJoinAndSelect('v.notes', 'n')
      .leftJoinAndSelect('n.revisions', 'r')
      .where('a.userId = :userId', { userId: user.id })
      .getMany();
  }

  async updateArtist(artist: Artist, attrs: Partial<Artist>): Promise<Artist> {
    Object.assign(artist, attrs);
    return await this.artistsRepository.save(artist);
  }

  async deleteArtist(id: string): Promise<string> {
    const result = await this.artistsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Artist not found');
    }
    return 'Artist successfully removed';
  }
}

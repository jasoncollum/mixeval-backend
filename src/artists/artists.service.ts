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
    const exists = await this.artistsRepository.findOne({
      name: createArtistDto.name,
    });
    if (exists) {
      throw new ConflictException('Artist with this name already exists');
    }

    if (!createArtistDto.image_url) {
      // link to a default image at some point ***
      createArtistDto.image_url = '/default/image_url';
    }
    const artist = this.artistsRepository.create({
      ...createArtistDto,
      user,
    });

    return await this.artistsRepository.save(artist);
  }

  async getArtistsWithFilters(
    filterDto: GetArtistsFilterDto,
    user: User,
  ): Promise<Artist[]> {
    const { hasOpenSongs } = filterDto;
    let { searchText } = filterDto;

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
        .orderBy('s.updated_at', 'DESC')
        .addOrderBy('v.number', 'DESC')
        .addOrderBy('n.created_at', 'ASC')
        .addOrderBy('r.created_at', 'ASC')
        .getMany();

      return Artists;
    }

    if (searchText) {
      searchText = searchText.toLowerCase();
      console.log(searchText);
      const Artists = await this.artistsRepository
        .createQueryBuilder('a')
        .leftJoinAndSelect('a.songs', 's')
        .leftJoinAndSelect('s.versions', 'v')
        .leftJoinAndSelect('v.notes', 'n')
        .leftJoinAndSelect('n.revisions', 'r')
        .where('a.userId = :userId', { userId: user.id })
        .andWhere('LOWER(a.name) like :name', {
          name: `%${searchText}%`,
        })
        .orWhere('LOWER(s.title) like :title', {
          title: `%${searchText}%`,
        })
        .orderBy('s.updated_at', 'DESC')
        .addOrderBy('v.number', 'DESC')
        .addOrderBy('n.created_at', 'ASC')
        .addOrderBy('r.created_at', 'ASC')
        .getMany();

      return Artists;
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
      .orderBy('s.updated_at', 'DESC')
      .addOrderBy('v.number', 'DESC')
      .addOrderBy('n.created_at', 'ASC')
      .addOrderBy('r.created_at', 'ASC')
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

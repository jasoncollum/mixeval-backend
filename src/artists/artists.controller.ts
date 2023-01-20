import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { Artist } from './artist.entity';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { ArtistByIdPipe } from './pipes/artist-by-id.pipe';
import { GetArtistsFilterDto } from './dtos/get-artists-filter.dto';

@Controller('artists')
@UseGuards(AuthGuard())
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Post('/')
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
    @GetUser() user: User,
  ): Promise<Artist> {
    return await this.artistsService.createArtist(createArtistDto, user);
  }

  @Get()
  async getArtists(
    @Query() filterDto: GetArtistsFilterDto,
    @GetUser() user: User,
  ): Promise<Artist[]> {
    if (Object.keys(filterDto).length) {
      return await this.artistsService.getArtistsWithFilters(filterDto, user);
    } else {
      return await this.artistsService.getArtists(user);
    }
  }

  // Get artists details only
  @Get('/details')
  async getArtistsDetails(@GetUser() user: User): Promise<Artist[]> {
    return await this.artistsService.getArtistsDetails(user);
  }

  @Patch('/:id')
  async updateArtist(
    @Param('id', ArtistByIdPipe) artist: Artist,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistsService.updateArtist(artist, updateArtistDto);
  }

  @Delete('/:id')
  async deleteArtist(@Param('id') id: string): Promise<string> {
    return await this.artistsService.deleteArtist(id);
  }
}

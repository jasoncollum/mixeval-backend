import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { Artist } from './artist.entity';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

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
}

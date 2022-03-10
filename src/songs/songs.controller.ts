import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSongDto } from './dtos/create-song.dto';
import { UpdateSongDto } from './dtos/update-song.dto';
import { Song } from './song.entity';
import { SongsService } from './songs.service';
import { TakesArtistIdReturnsArtistPipe } from './pipes/takes-artistId-returns-artist.pipe';
import { SongByIdPipe } from './pipes/song-by-id.pipe';

@Controller('songs')
@UseGuards(AuthGuard())
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post('/')
  async createSong(
    @Body(TakesArtistIdReturnsArtistPipe) createSongDto: CreateSongDto,
  ) {
    return await this.songsService.createSong(createSongDto);
  }

  @Get('/:id')
  async getSong(@Param('id', SongByIdPipe) song: Song): Promise<Song> {
    return song;
  }

  @Patch('/:id')
  async updateSong(
    @Param('id', SongByIdPipe) song: Song,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<Song> {
    return await this.songsService.updateSong(song, updateSongDto);
  }

  @Delete('/:id')
  async deleteSong(@Param('id') id: string): Promise<void> {
    return await this.songsService.deleteSong(id);
  }
}

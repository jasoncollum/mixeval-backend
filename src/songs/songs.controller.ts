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

@Controller('songs')
@UseGuards(AuthGuard())
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post('/')
  async createSong(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return await this.songsService.createSong(createSongDto);
  }

  @Get('/:id')
  async getSong(@Param('id') id: string): Promise<Song> {
    return await this.songsService.getSong(id);
  }

  @Patch('/:id')
  async updateSong(
    @Param('id') id: string,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<Song> {
    return await this.songsService.updateSong(id, updateSongDto);
  }

  @Delete('/:id')
  async deleteSong(@Param('id') id: string): Promise<void> {
    return await this.songsService.deleteSong(id);
  }
}

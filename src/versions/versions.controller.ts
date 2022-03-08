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
import { VersionsService } from './versions.service';
import { CreateVersionDto } from './dtos/create-version.dto';
import { Version } from './version.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateVersionDto } from './dtos/update-version.dto';
import { TakesSongIdReturnsSongPipe } from './pipes/takes-songId-returns-song.pipe';

@Controller('versions')
@UseGuards(AuthGuard())
export class VersionsController {
  constructor(private versionsService: VersionsService) {}

  @Post('/')
  async createVersion(
    @Body(TakesSongIdReturnsSongPipe) createVersionDto: CreateVersionDto,
  ): Promise<Version> {
    return await this.versionsService.createVersion(createVersionDto);
  }

  @Get('/:id')
  async getVersion(@Param('id') id: string): Promise<Version> {
    return await this.versionsService.getVersion(id);
  }

  @Patch('/:id')
  async updateVersion(
    @Param('id') id: string,
    @Body() updateVersionDto: UpdateVersionDto,
  ): Promise<Version> {
    return await this.versionsService.updateVersion(id, updateVersionDto);
  }

  @Delete('/:id')
  async deleteVersion(@Param('id') id: string): Promise<void> {
    return await this.versionsService.deleteVersion(id);
  }
}

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
import { RevisionDto } from './dtos/revision.dto';
import { RevisionsService } from './revisions.service';
import { Revision } from './revision.entity';
import { AuthGuard } from '@nestjs/passport';
import { TakesNoteIdReturnsNotePipe } from './pipes/takes-noteId-returns-note.pipe';
import { RevisionByIdPipe } from './pipes/revision-by-id.pipe';

@Controller('revisions')
@UseGuards(AuthGuard())
export class RevisionsController {
  constructor(private revisionsService: RevisionsService) {}

  @Post('/')
  async createRevision(
    @Body(TakesNoteIdReturnsNotePipe) revisionDto: RevisionDto,
  ): Promise<Revision> {
    return await this.revisionsService.createRevision(revisionDto);
  }

  @Get('/:id')
  async getRevision(
    @Param('id', RevisionByIdPipe) revision: Revision,
  ): Promise<Revision> {
    return revision;
  }

  @Patch('/:id')
  async updateRevision(
    @Param('id', RevisionByIdPipe) revision: Revision,
    @Body(TakesNoteIdReturnsNotePipe) revisionDto: RevisionDto,
  ): Promise<Revision> {
    return await this.revisionsService.updateRevision(revision, revisionDto);
  }

  @Delete('/:id')
  async deleteRevision(@Param('id') id: string): Promise<void> {
    return await this.revisionsService.deleteRevision(id);
  }
}

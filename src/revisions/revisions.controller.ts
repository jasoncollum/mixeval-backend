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
import { CreateRevisionDto } from './dtos/create-revision.dto';
import { RevisionsService } from './revisions.service';
import { Revision } from './revision.entity';
import { ValidateCreateRevisionsPipe } from './pipes/validate-create-revisions.pipe';
import { ValidateUpdateRevisionsPipe } from './pipes/validate-update-revisions.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RevisionByIdPipe } from './pipes/revision-by-id.pipe';
import { UpdateRevisionDto } from './dtos/update-revision.dto';

@Controller('revisions')
@UseGuards(AuthGuard())
export class RevisionsController {
  constructor(private revisionsService: RevisionsService) {}

  @Post('/')
  async createBulkNotes(
    @Body(ValidateCreateRevisionsPipe) createRevisionDto: CreateRevisionDto[],
  ): Promise<void> {
    return await this.revisionsService.createBulkRevisions(createRevisionDto);
  }

  @Get('/:id')
  async getRevision(
    @Param('id', RevisionByIdPipe) revision: Revision,
  ): Promise<Revision> {
    return revision;
  }

  @Patch('/')
  async updateBulkNotes(
    @Body(ValidateUpdateRevisionsPipe) updateRevisionDto: UpdateRevisionDto[],
  ): Promise<void> {
    return await this.revisionsService.updateBulkRevisions(updateRevisionDto);
  }

  @Delete('/:id')
  async deleteRevision(@Param('id') id: string): Promise<void> {
    return await this.revisionsService.deleteRevision(id);
  }
}

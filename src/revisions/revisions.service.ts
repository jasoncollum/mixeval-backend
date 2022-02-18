import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRevisionDto } from './dtos/create-revision.dto';
import { RevisionsRepository } from './revisions.repository';
import { NotesRepository } from '../notes/notes.repository';
import { Revision } from './revision.entity';
import { UpdateRevisionDto } from './dtos/update-revision.dto';

@Injectable()
export class RevisionsService {
  constructor(
    private revisionsRepository: RevisionsRepository,
    private notesRepository: NotesRepository,
  ) {}

  async createRevision(
    createRevisionDto: CreateRevisionDto,
  ): Promise<Revision> {
    const result = await this.notesRepository.find({
      where: { id: createRevisionDto.noteId },
    });
    if (!result) {
      throw new NotFoundException('Note not found');
    }
    const note = result[0];
    return await this.revisionsRepository.createRevision(
      createRevisionDto,
      note,
    );
  }

  async getRevision(id: string): Promise<Revision> {
    const revision = await this.revisionsRepository.findOne(id);
    if (!revision) {
      throw new NotFoundException('Revision not found');
    }
    return revision;
  }

  async updateRevision(
    id: string,
    updateRevisionDto: UpdateRevisionDto,
  ): Promise<Revision> {
    return await this.revisionsRepository.updateRevision(id, updateRevisionDto);
  }

  async deleteRevision(id: string): Promise<void> {
    const result = await this.revisionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Revision not found');
    }
  }
}

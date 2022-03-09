import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateRevisionDto } from './dtos/create-revision.dto';
import { Revision } from './revision.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../notes/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RevisionsService {
  constructor(
    @InjectRepository(Revision)
    private revisionsRepository: Repository<Revision>,
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async createRevision(
    createRevisionDto: CreateRevisionDto,
  ): Promise<Revision> {
    const alreadyExists = createRevisionDto.note.revisions.filter(
      (revision) => revision.text === createRevisionDto.text,
    );

    if (alreadyExists.length > 0) {
      throw new ConflictException(
        `This specific revision already exists for this note`,
      );
    }

    const revision = this.revisionsRepository.create({
      text: createRevisionDto.text,
      note: createRevisionDto.note,
    });
    try {
      return await this.revisionsRepository.save(revision);
    } catch (error) {}
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
    attrs: Partial<Revision>,
  ): Promise<Revision> {
    const revision = await this.revisionsRepository.findOne(id);
    if (!revision) {
      throw new NotFoundException('Revision not found');
    }
    Object.assign(revision, attrs);
    return await this.revisionsRepository.save(revision);
  }

  async deleteRevision(id: string): Promise<void> {
    const result = await this.revisionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Revision not found');
    }
  }
}

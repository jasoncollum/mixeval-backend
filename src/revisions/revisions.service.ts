import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { RevisionDto } from './dtos/revision.dto';
import { Revision } from './revision.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RevisionsService {
  constructor(
    @InjectRepository(Revision)
    private revisionsRepository: Repository<Revision>,
  ) {}

  async createRevision(revisionDto: RevisionDto): Promise<Revision> {
    const alreadyExists = revisionDto.note.revisions.filter(
      (revision) => revision.text === revisionDto.text,
    );

    if (alreadyExists.length > 0) {
      throw new ConflictException(
        `This specific revision already exists for this note`,
      );
    }

    const revision = this.revisionsRepository.create({
      text: revisionDto.text,
      note: revisionDto.note,
    });
    try {
      return await this.revisionsRepository.save(revision);
    } catch (error) {}
  }

  async updateRevision(
    revision: Revision,
    attrs: Partial<Revision>,
  ): Promise<Revision> {
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

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { NewRevisionDto } from './dtos/newRevision.dto';
import { Revision } from './revision.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RevisionsService {
  constructor(
    @InjectRepository(Revision)
    private revisionsRepository: Repository<Revision>,
  ) {}

  async createBulkRevisions(newRevisions: NewRevisionDto[]): Promise<void> {
    try {
      await this.revisionsRepository.save(newRevisions);
    } catch (error) {
      // add error messaging
    }
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

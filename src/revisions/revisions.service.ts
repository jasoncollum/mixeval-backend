import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateRevisionDto } from './dtos/create-revision.dto';
import { Revision } from './revision.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateRevisionDto } from './dtos/update-revision.dto';

@Injectable()
export class RevisionsService {
  constructor(
    @InjectRepository(Revision)
    private revisionsRepository: Repository<Revision>,
  ) {}

  async createBulkRevisions(
    createRevisionDto: CreateRevisionDto[],
  ): Promise<void> {
    try {
      await this.revisionsRepository.save(createRevisionDto);
    } catch (error) {
      // add error messaging
    }
  }

  async updateBulkRevisions(
    updateRevisionDto: UpdateRevisionDto[],
  ): Promise<void> {
    try {
      await this.revisionsRepository.upsert(updateRevisionDto, ['id']);
    } catch (error) {
      // add a custom exception message here ?
    }
  }

  // async updateRevision(
  //   revision: Revision,
  //   attrs: Partial<Revision>,
  // ): Promise<Revision> {
  //   Object.assign(revision, attrs);
  //   return await this.revisionsRepository.save(revision);
  // }

  async deleteRevision(id: string): Promise<void> {
    const result = await this.revisionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Revision not found');
    }
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { CreateRevisionDto } from './dtos/create-revision.dto';
import { Revision } from './revision.entity';
import { Note } from '../notes/note.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

@EntityRepository(Revision)
export class RevisionsRepository extends Repository<Revision> {
  async createRevision(
    { text }: CreateRevisionDto,
    note: Note,
  ): Promise<Revision> {
    const revision = this.create({ text, note });
    try {
      return await this.save(revision);
    } catch (error) {
      throw new ConflictException('Revision already exists');
    }
  }

  async updateRevision(
    id: string,
    attrs: Partial<Revision>,
  ): Promise<Revision> {
    const revision = await this.findOne(id);
    if (!revision) {
      throw new NotFoundException('Revision not found');
    }
    Object.assign(revision, attrs);
    return await this.save(revision);
  }
}

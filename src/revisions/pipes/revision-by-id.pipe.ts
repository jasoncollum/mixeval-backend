import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Revision } from '../revision.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RevisionByIdPipe
  implements PipeTransform<string, Promise<Revision>>
{
  constructor(
    @InjectRepository(Revision)
    private revisionsRepository: Repository<Revision>,
  ) {}
  async transform(value): Promise<Revision> {
    const revision = await this.revisionsRepository.findOne(value);
    if (!revision) {
      throw new NotFoundException('Revision not found');
    }
    return revision;
  }
}

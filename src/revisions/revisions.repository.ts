import { EntityRepository, Repository } from 'typeorm';
import { Revision } from './revision.entity';

@EntityRepository(Revision)
export class RevisionsRepository extends Repository<Revision> {
  //
}

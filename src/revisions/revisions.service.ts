import { Injectable } from '@nestjs/common';
import { RevisionsRepository } from './revisions.repository';

@Injectable()
export class RevisionsService {
  constructor(private revisionsRepsository: RevisionsRepository) {}
}

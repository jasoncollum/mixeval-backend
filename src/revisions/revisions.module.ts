import { Module } from '@nestjs/common';
import { RevisionsService } from './revisions.service';
import { RevisionsController } from './revisions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevisionsRepository } from './revisions.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RevisionsRepository]), AuthModule],
  providers: [RevisionsService],
  controllers: [RevisionsController],
})
export class RevisionsModule {}

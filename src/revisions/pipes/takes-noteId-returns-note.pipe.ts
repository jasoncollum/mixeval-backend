// import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Note } from '../../notes/note.entity';
// import { Repository } from 'typeorm';
// import { RevisionDto } from '../dtos/newRevision.dto';

// @Injectable()
// export class TakesNoteIdReturnsNotePipe
//   implements PipeTransform<RevisionDto, Promise<RevisionDto>>
// {
//   constructor(
//     @InjectRepository(Note)
//     private notesRepository: Repository<Note>,
//   ) {}
//   async transform(value): Promise<RevisionDto> {
//     const note = await this.notesRepository
//       .createQueryBuilder('n')
//       .leftJoinAndSelect('n.revisions', 'r')
//       .leftJoinAndSelect('n.version', 'v')
//       .where('n.id = :id', { id: value.noteId })
//       .getOne();

//     if (!note) {
//       throw new NotFoundException('Note not found');
//     }
//     value.note = note;
//     return value;
//   }
// }

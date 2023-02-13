import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../../notes/note.entity';
import { Repository } from 'typeorm';
import { NewRevisionDto } from '../dtos/newRevision.dto';
import { Revision } from '../revision.entity';

@Injectable()
export class ValidateRevisionsPipe
  implements PipeTransform<NewRevisionDto[], Promise<NewRevisionDto[]>>
{
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Revision)
    private revisionsRepository: Repository<Revision>,
  ) {}
  async transform(value: NewRevisionDto[]): Promise<NewRevisionDto[]> {
    if (value.length === 1) {
      const note = await this.notesRepository.findOne({
        where: {
          id: value[0].noteId,
        },
      });
      if (!note) {
        throw new NotFoundException('Note not found');
      }
      value[0].note = note;
      return value;
    }
    let uniqueIds = [] as string[];
    const noteIds = value.map((revision) => {
      return revision.noteId;
    });
    uniqueIds = noteIds.filter((id, index) => {
      return noteIds.indexOf(id) === index;
    });

    const notes = await this.notesRepository
      .createQueryBuilder('note')
      .where('note.id IN (:...uniqueIds)', { uniqueIds: uniqueIds })
      .getMany();
    console.log(notes);

    value.forEach((revision) => {
      const revNote = notes.find((note) => note.id === revision.noteId);
      if (!revNote) {
        throw new NotFoundException('Note not found');
      }
      revision.note = revNote;
    });
    return value;
  }
}

import { Note } from '../notes/note.entity';
import { Injectable } from '@nestjs/common';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  Connection,
  Repository,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from '../songs/song.entity';

@Injectable()
@EventSubscriber()
export class NotesSubscriber implements EntitySubscriberInterface<Note> {
  constructor(
    private connection: Connection,
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Note;
  }

  afterInsert(event: InsertEvent<Note>): void {
    this.songsRepository.update(
      { id: event.entity.version.songId },
      { triggerUpdate: new Date() },
    );
  }

  afterUpdate(event: UpdateEvent<Note>): void {
    this.songsRepository.update(
      { id: event.entity.version.songId },
      { triggerUpdate: new Date() },
    );
  }
}

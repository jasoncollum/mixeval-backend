import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Repository,
  UpdateEvent,
} from 'typeorm';
import { Version } from '../versions/version.entity';
import { Song } from '../songs/song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
@EventSubscriber()
export class VersionsSubscriber implements EntitySubscriberInterface<Version> {
  constructor(
    private connection: Connection,
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Version;
  }

  afterInsert(event: InsertEvent<Version>): void {
    this.songsRepository.update(
      { id: event.entity.song.id },
      { triggerUpdate: new Date() },
    );
  }

  afterUpdate(event: UpdateEvent<Version>): void {
    this.songsRepository.update(
      { id: event.entity.songId },
      { triggerUpdate: new Date() },
    );
  }
}

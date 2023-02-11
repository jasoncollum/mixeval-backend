// import { Injectable } from '@nestjs/common';
// import {
//   EventSubscriber,
//   EntitySubscriberInterface,
//   Connection,
//   Repository,
//   InsertEvent,
//   UpdateEvent,
// } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Song } from '../songs/song.entity';
// import { Revision } from '../revisions/revision.entity';

// @Injectable()
// @EventSubscriber()
// export class RevisionsSubscriber
//   implements EntitySubscriberInterface<Revision>
// {
//   constructor(
//     private connection: Connection,
//     @InjectRepository(Song)
//     private songsRepository: Repository<Song>,
//   ) {
//     connection.subscribers.push(this);
//   }

//   listenTo() {
//     return Revision;
//   }

//   afterInsert(event: InsertEvent<Revision>): void {
//     this.songsRepository.update(
//       { id: event.entity.note.version.songId },
//       { triggerUpdate: new Date() },
//     );
//   }

//   afterUpdate(event: UpdateEvent<Revision>): void {
//     this.songsRepository.update(
//       { id: event.entity.note.version.songId },
//       { triggerUpdate: new Date() },
//     );
//   }
// }

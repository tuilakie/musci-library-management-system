import { Track } from '@/tracks/entities/track.entity';

export class Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
}

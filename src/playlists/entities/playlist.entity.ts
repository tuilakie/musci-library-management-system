import { Track } from '@/tracks/entities/track.entity';

export class Playlist {
  id: number;
  name: string;
  description: string;
  tracks: Track[];
}

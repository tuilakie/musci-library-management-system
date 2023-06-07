import { Injectable } from '@nestjs/common';
import { ZingMp3 } from 'zingmp3-api-full';

@Injectable()
export class ZingMp3Service {
  async getSong(query: string): Promise<string> {
    try {
      const res = await ZingMp3.search(query);
      const songs = await ZingMp3.getSong(res.data.songs[0].encodeId);
      return songs.data['128'];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

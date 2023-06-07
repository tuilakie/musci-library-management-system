import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksModule } from './tracks/tracks.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { PrismaModule } from './prisma/prisma.module';
import { ZingMp3Service } from './zing-mp3/zing-mp3.service';

@Module({
  imports: [TracksModule, PlaylistsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, ZingMp3Service],
})
export class AppModule {}

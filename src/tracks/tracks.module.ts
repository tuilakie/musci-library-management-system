import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { ZingMp3Service } from '@/zing-mp3/zing-mp3.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, PrismaService, ZingMp3Service],
  exports: [TracksService],
})
export class TracksModule {}

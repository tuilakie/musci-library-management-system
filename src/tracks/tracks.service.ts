import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { ZingMp3Service } from '@/zing-mp3/zing-mp3.service';

@Injectable()
export class TracksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly zingmp3: ZingMp3Service,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    // const res = await this.zingmp3.getSong(createTrackDto.title);

    return this.prisma.track.create({
      data: createTrackDto,
    });
  }

  findAll(queryParam: {
    title: string;
    artist: string;
    album: string;
    genre: string;
    skip: number;
    take: number;
  }) {
    const { title, artist, album, genre, skip, take } = queryParam;
    if (!title && !artist && !album && genre) {
      return this.prisma.track.findMany({
        skip,
        take,
      });
    }

    return this.prisma.track.findMany({
      where: {
        OR: [
          {
            title: {
              contains: title,
              mode: 'insensitive',
            },
          },
          {
            artist: {
              contains: artist,
              mode: 'insensitive',
            },
          },
          {
            album: {
              contains: album,
              mode: 'insensitive',
            },
          },
          {
            genre: {
              contains: genre,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  findOne(id: string) {
    return this.prisma.track.findUniqueOrThrow({
      where: { id },
    });
  }

  async stream(id: string) {
    const track = await this.prisma.track.findUniqueOrThrow({
      where: { id },
    });
    const res = await this.zingmp3.getSong(track.title);
    if (!res) {
      throw new HttpException('Resource track not exist!', 404);
    }
    return res;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  remove(id: string) {
    return this.prisma.track.delete({
      where: { id },
    });
  }
}

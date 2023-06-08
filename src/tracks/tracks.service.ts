import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { ZingMp3Service } from '@/zing-mp3/zing-mp3.service';
import { Meta } from '@/common/base/base.response';
import { Track } from './entities/track.entity';

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

  async findAll(queryParam: {
    title: string;
    artist: string;
    album: string;
    genre: string;
    skip: number;
    take: number;
  }) {
    const { title, artist, album, genre, skip, take } = queryParam;

    let data: Track[];
    let total: number;

    if (!title && !artist && !album && !genre) {
      data = await this.prisma.track.findMany({
        skip,
        take,
      });
      total = await this.prisma.track.count();
    } else {
      data = await this.prisma.track.findMany({
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
        skip,
        take,
      });

      total = await this.prisma.track.count({
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

    const pages = Math.ceil(total / take);
    const current = Math.ceil(skip / take) + 1;
    const size = data.length;

    const meta: Meta = {
      total,
      pages,
      current,
      size,
    };

    return { data, meta };
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

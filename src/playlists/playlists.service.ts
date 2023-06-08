import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Playlist } from './entities/playlist.entity';
import { Meta } from '@/common/base/base.response';

@Injectable()
export class PlaylistsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPlaylistDto: CreatePlaylistDto) {
    console.log(createPlaylistDto);
    return this.prisma.playlist.create({
      data: createPlaylistDto,
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
    console.log(queryParam);
    let data: Omit<Playlist, 'tracks'>[];
    let total: number;
    if (!title && !artist && !album && !genre) {
      data = await this.prisma.playlist.findMany({
        skip,
        take,
        include: {
          _count: {
            select: {
              tracks: true,
            },
          },
        },
      });
      total = await this.prisma.playlist.count();
    } else {
      data = await this.prisma.playlist.findMany({
        where: {
          OR: [
            {
              name: {
                contains: title,
                mode: 'insensitive',
              },
            },
            {
              tracks: {
                some: {
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
              },
            },
          ],
        },
        include: {
          _count: {
            select: {
              tracks: true,
            },
          },
        },
        skip,
        take,
      });
      total = await this.prisma.playlist.count({
        where: {
          OR: [
            {
              name: {
                contains: title,
                mode: 'insensitive',
              },
            },
            {
              tracks: {
                some: {
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
    return this.prisma.playlist.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        tracks: true,
      },
    });
  }

  update(id: string, updatePlaylistDto: UpdatePlaylistDto) {
    return this.prisma.playlist.update({
      where: {
        id,
      },
      data: updatePlaylistDto,
    });
  }

  addTrack(id: string, trackId: string[]) {
    return this.prisma.playlist.update({
      where: {
        id,
      },
      data: {
        tracks: {
          connect: trackId.map((id) => ({ id })),
        },
      },
    });
  }

  removeTrack(id: string, trackId: string[]) {
    return this.prisma.playlist.update({
      where: {
        id,
      },
      data: {
        tracks: {
          disconnect: trackId.map((id) => ({ id })),
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.playlist.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}

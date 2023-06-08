import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { TracksIdDto } from './dto/tracksId.dto';
import { Playlist } from './entities/playlist.entity';
import { ApiQuery } from '@nestjs/swagger';
import { BaseResponse } from '@/common/base/base.response';

@Controller('api/playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  async create(
    @Body() createPlaylistDto: CreatePlaylistDto,
  ): Promise<BaseResponse<Omit<Playlist, 'tracks'>>> {
    const data = await this.playlistsService.create(createPlaylistDto);
    const response: BaseResponse<Omit<Playlist, 'tracks'>> = {
      success: true,
      message: 'Playlist created successfully',
      data: data,
    };
    return response;
  }

  @Get()
  @ApiQuery({ name: 'title', type: 'string', required: false })
  @ApiQuery({ name: 'artist', type: 'string', required: false })
  @ApiQuery({ name: 'album', type: 'string', required: false })
  @ApiQuery({ name: 'genre', type: 'string', required: false })
  @ApiQuery({ name: 'skip', type: 'number', required: false })
  @ApiQuery({ name: 'take', type: 'number', required: false })
  async findAll(
    @Query('title') title?: string,
    @Query('artist') artist?: string,
    @Query('album') album?: string,
    @Query('genre') genre?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<BaseResponse<Omit<Playlist, 'tracks'>[]>> {
    const { data, meta } = await this.playlistsService.findAll({
      title,
      artist,
      album,
      genre,
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 10,
    });

    const response: BaseResponse<Omit<Playlist, 'tracks'>[]> = {
      success: true,
      message: 'Playlists retrieved successfully',
      data,
      meta,
    };
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BaseResponse<Playlist>> {
    const data = await this.playlistsService.findOne(id);
    const response: BaseResponse<Playlist> = {
      success: true,
      message: 'Playlist retrieved successfully',
      data,
    };
    return response;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<BaseResponse<Omit<Playlist, 'tracks'>>> {
    const data = await this.playlistsService.update(id, updatePlaylistDto);
    const response: BaseResponse<Omit<Playlist, 'tracks'>> = {
      success: true,
      message: 'Playlist updated successfully',
      data,
    };
    return response;
  }

  @Post(':id/add-tracks')
  async addTrack(
    @Param('id') id: string,
    @Body() tracksIdDto: TracksIdDto,
  ): Promise<BaseResponse<Omit<Playlist, 'tracks'>>> {
    const data = await this.playlistsService.addTrack(id, tracksIdDto.tracks);
    const response: BaseResponse<Omit<Playlist, 'tracks'>> = {
      success: true,
      message: 'Track added successfully',
      data,
    };
    return response;
  }

  @Post(':id/remove-tracks')
  async removeTrack(
    @Param('id') id: string,
    @Body() tracksIdDto: TracksIdDto,
  ): Promise<BaseResponse<Omit<Playlist, 'tracks'>>> {
    const data = await this.playlistsService.removeTrack(
      id,
      tracksIdDto.tracks,
    );
    const response: BaseResponse<Omit<Playlist, 'tracks'>> = {
      success: true,
      message: 'Track removed successfully',
      data,
    };
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BaseResponse<string>> {
    const data = await this.playlistsService.remove(id);
    const response: BaseResponse<string> = {
      success: true,
      message: 'Playlist removed successfully',
      data,
    };
    return response;
  }
}

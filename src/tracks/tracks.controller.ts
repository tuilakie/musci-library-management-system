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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Track } from './entities/track.entity';
import { BaseResponse } from '@/common/base/base.response';

@ApiTags('tracks')
@Controller('api')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post('track')
  async create(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<BaseResponse<Track>> {
    const data = await this.tracksService.create(createTrackDto);
    const response: BaseResponse<Track> = {
      success: true,
      message: 'Track created successfully',
      data: data,
    };
    return response;
  }

  @Get('tracks')
  @ApiQuery({ name: 'title', type: 'string', required: false })
  @ApiQuery({ name: 'artist', type: 'string', required: false })
  @ApiQuery({ name: 'album', type: 'string', required: false })
  @ApiQuery({ name: 'genre', type: 'string', required: false })
  // @ApiQuery({ name: 'skip', type: 'number', required: false })
  // @ApiQuery({ name: 'take', type: 'number', required: false })
  async findAll(
    @Query('title') title?: string,
    @Query('artist') artist?: string,
    @Query('album') album?: string,
    @Query('genre') genre?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<BaseResponse<Track[]>> {
    const { data, meta } = await this.tracksService.findAll({
      title,
      artist,
      album,
      genre,
      skip: skip || 0,
      take: take || 10,
    });

    const response: BaseResponse<Track[]> = {
      success: true,
      message: 'Tracks retrieved successfully',
      data: data,
      meta: meta,
    };
    return response;
  }

  @Get('track/:id')
  async findOne(@Param('id') id: string): Promise<BaseResponse<Track>> {
    const data = await this.tracksService.findOne(id);
    const response: BaseResponse<Track> = {
      success: true,
      message: 'Track retrieved successfully',
      data: data,
    };
    return response;
  }

  @Get('track/:id/stream')
  async stream(@Param('id') id: string): Promise<BaseResponse<string>> {
    const data = await this.tracksService.stream(id);
    const response: BaseResponse<string> = {
      success: true,
      message: 'Link retrieved successfully',
      data: data,
    };
    return response;
  }

  @Patch('track/:id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<BaseResponse<Track>> {
    const data = await this.tracksService.update(id, updateTrackDto);
    const response: BaseResponse<Track> = {
      success: true,
      message: 'Track updated successfully',
      data: data,
    };
    return response;
  }

  @Delete('track/:id')
  async remove(@Param('id') id: string): Promise<BaseResponse<Track>> {
    const data = await this.tracksService.remove(id);
    const response: BaseResponse<Track> = {
      success: true,
      message: 'Track deleted successfully',
      data: data,
    };
    return response;
  }
}

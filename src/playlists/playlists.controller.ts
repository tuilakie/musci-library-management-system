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

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(@Body() createPlaylistDto: Omit<CreatePlaylistDto, 'tracks'>) {
    return this.playlistsService.create(createPlaylistDto);
  }

  @Get()
  findAll(
    @Query('title') title?: string,
    @Query('artist') artist?: string,
    @Query('album') album?: string,
    @Query('genre') genre?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.playlistsService.findAll({
      title,
      artist,
      album,
      genre,
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 10,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistsService.update(+id, updatePlaylistDto);
  }

  @Post(':id/addtracks')
  addTrack(@Param('id') id: string, @Body() tracksIdDto: TracksIdDto) {
    return this.playlistsService.addTrack(+id, tracksIdDto.tracks);
  }

  @Post(':id/removetracks')
  removeTrack(@Param('id') id: string, @Body() tracksIdDto: TracksIdDto) {
    return this.playlistsService.removeTrack(+id, tracksIdDto.tracks);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistsService.remove(+id);
  }
}

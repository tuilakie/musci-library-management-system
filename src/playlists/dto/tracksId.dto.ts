import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class TracksIdDto {
  @IsString({ each: true })
  @IsArray()
  @ApiProperty({ type: String, description: 'tracks id of playlist' })
  tracks: string[];
}

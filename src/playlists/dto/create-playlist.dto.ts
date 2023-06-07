import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ type: String, description: 'name of playlist' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ type: String, description: 'name of playlist' })
  description: string;

  // @IsString({ each: true })
  // @IsArray()
  // @ApiProperty({ type: String, description: 'tracks id of playlist' })
  // tracks: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ type: String, description: 'Track title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Track artist' })
  artist: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Track album' })
  album: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Track genre' })
  genre: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: Number, description: 'Track release year' })
  releaseYear: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: Number, description: 'Track duration' })
  duration: number;

  // @IsNotEmpty()
  // @IsUrl()
  // @ApiProperty({ type: String, description: 'Track url' })
  // url: string;
}

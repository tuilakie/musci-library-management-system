import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTrackDto {
  @IsString({ message: 'title must be a string' })
  @IsNotEmpty({ message: 'title must not be empty' })
  @MaxLength(100, { message: 'title must be less than 100 characters' })
  @ApiProperty({ type: String, description: 'Track title' })
  title: string;

  @IsString({ message: 'artist must be a string' })
  @IsNotEmpty({ message: 'artist must not be empty' })
  @ApiProperty({ type: String, description: 'Track artist' })
  artist: string;

  @IsString({ message: 'album must be a string' })
  @IsNotEmpty({ message: 'album must not be empty' })
  @ApiProperty({ type: String, description: 'Track album' })
  album: string;

  @IsString({ message: 'genre must be a string' })
  @IsNotEmpty({ message: 'genre must not be empty' })
  @ApiProperty({ type: String, description: 'Track genre' })
  genre: string;

  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'releaseYear must be a number' },
  )
  @IsNotEmpty({ message: 'releaseYear must not be empty' })
  @ApiProperty({ type: Number, description: 'Track release year' })
  releaseYear: number;

  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'duration must be a number' },
  )
  @IsPositive()
  @ApiProperty({ type: Number, description: 'Track duration' })
  duration: number;

  // @IsNotEmpty()
  // @IsUrl()
  // @ApiProperty({ type: String, description: 'Track url' })
  // url: string;
}

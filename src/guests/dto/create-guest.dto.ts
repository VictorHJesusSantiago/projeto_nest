import { IsString, IsNotEmpty, IsBoolean, IsInt } from 'class-validator';

export class CreateGuestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  rsvp: boolean;

  @IsInt()
  @IsNotEmpty()
  teacherId: number;
}
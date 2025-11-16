import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  limit = 10;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  offset = 0;
}
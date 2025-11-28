import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTeacherDto: CreateTeacherDto) {
    return this.prisma.teacher.create({
      data: createTeacherDto,
    });
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.prisma.teacher.findMany({
      take: limit,
      skip: offset,
      include: {
        _count: {
          select: { guests: true },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.teacher.findUnique({
      where: { id },
      include: { 
        guests: true 
      },
    });
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.prisma.teacher.update({
      where: { id },
      data: updateTeacherDto,
    });
  }

  remove(id: number) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }
}
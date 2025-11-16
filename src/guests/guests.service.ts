import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class GuestsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createGuestDto: CreateGuestDto) {
    // Prisma irá associar automaticamente usando o teacherId
    return this.prisma.guest.create({
      data: createGuestDto,
    });
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    return this.prisma.guest.findMany({
      skip: offset,
      take: limit,
      include: {
        teacher: true, // Inclui o Teacher relacionado
      },
    });
  }

  async findOne(id: number) {
    const guest = await this.prisma.guest.findUnique({
      where: { id },
      include: {
        teacher: true, // Inclui o Teacher relacionado
      },
    });
    if (!guest) {
      throw new NotFoundException(`Convidado com ID #${id} não encontrado`);
    }
    return guest;
  }

  async update(id: number, updateGuestDto: UpdateGuestDto) {
    await this.findOne(id);
    return this.prisma.guest.update({
      where: { id },
      data: updateGuestDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.guest.delete({ where: { id } });
    return `Convidado com ID #${id} removido com sucesso.`;
  }
}
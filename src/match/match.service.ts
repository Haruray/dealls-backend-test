import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMatchDto: CreateMatchDto) {
    return await this.prisma.match.create({
      data: createMatchDto,
    });
  }

  async findAll() {
    return await this.prisma.match.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.match.findFirstOrThrow({
      where: { id },
    });
  }

  async update(id: string, updateMatchDto: UpdateMatchDto) {
    return await this.prisma.match.update({
      where: { id },
      data: updateMatchDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.match.delete({
      where: { id },
    });
  }
}

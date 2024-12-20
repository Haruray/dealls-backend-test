import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSwipeHistoryDto } from './dto/create-swipe-history.dto';
import { UpdateSwipeHistoryDto } from './dto/update-swipe-history.dto';
import { Membership } from '@prisma/client';

@Injectable()
export class SwipeHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSwipeHistoryDto: CreateSwipeHistoryDto) {
    if (await this.hasExceededDailyLimit(createSwipeHistoryDto.userId)) {
      throw new Error('You have exceeded the daily swipe limit');
    }

    if (createSwipeHistoryDto.userId === createSwipeHistoryDto.swipedUserId) {
        throw new Error('You cannot swipe yourself');
    }

    return this.prisma.swipeHistory.create({
      data: createSwipeHistoryDto,
    });
  }

  async findOne(id: string) {
    return this.prisma.swipeHistory.findFirstOrThrow({
      where: { id },
    });
  }

  async findAll() {
    return this.prisma.swipeHistory.findMany();
  }

  async update(id: string, updateSwipeHistoryDto: UpdateSwipeHistoryDto) {

    if (await this.hasExceededDailyLimit(updateSwipeHistoryDto.userId)) {
      throw new Error('You have exceeded the daily swipe limit');
    }

    if (updateSwipeHistoryDto.userId === updateSwipeHistoryDto.swipedUserId) {
        throw new Error('You cannot swipe yourself');
    }

    return this.prisma.swipeHistory.update({
      where: { id },
      data: updateSwipeHistoryDto,
    });
  }

  async remove(id: string) {
    return this.prisma.swipeHistory.delete({
      where: { id },
    });
  }

  private async hasExceededDailyLimit(userId: string): Promise<boolean> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const user = await this.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (user.membership === Membership.VERIFIED) {
        return false;
    }


    const swipeCount = await this.prisma.swipeHistory.count({
      where: {
        userId,
        date: {
          gte: today,
        },
      },
    });

    return swipeCount >= 10;
  }
}
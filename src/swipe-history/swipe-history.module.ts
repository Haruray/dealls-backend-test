import { Module } from '@nestjs/common';
import { SwipeHistoryService } from './swipe-history.service';
import { SwipeHistoryController } from './swipe-history.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SwipeHistoryController],
  providers: [SwipeHistoryService, PrismaService],
  exports: [SwipeHistoryService],
})
export class SwipeHistoryModule {}

import { Module } from '@nestjs/common';
import { PaymentHistoryService } from './payment-history.service';
import { PaymentHistoryController } from './payment-history.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PaymentHistoryController],
  providers: [PaymentHistoryService, PrismaService],
})
export class PaymentHistoryModule {}

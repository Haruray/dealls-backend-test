import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatePaymentHistoryDto,
  UpdatePaymentHistoryDto,
} from './dto/payment-history.dto';
import { Membership, PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentHistoryDto: CreatePaymentHistoryDto) {
    try {
      const payment = await this.prisma.paymentHistory.create({
        data: createPaymentHistoryDto,
      });

      if (createPaymentHistoryDto.paymentStatus == PaymentStatus.COMPLETED) {
        // update user membership
        await this.prisma.user.update({
          where: { id: createPaymentHistoryDto.userId },
          data: {
            membership: Membership.VERIFIED,
            membershipValidUntil: new Date(
              new Date().setMonth(new Date().getMonth() + 1),
            ),
          },
        });
      }

      return payment;
    } catch (error) {
      throw new Error(`Error creating payment history: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.paymentHistory.findMany();
    } catch (error) {
      throw new Error(`Error retrieving payment histories: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.paymentHistory.findFirstOrThrow({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Error retrieving payment history: ${error.message}`);
    }
  }

  async update(id: string, updatePaymentHistoryDto: UpdatePaymentHistoryDto) {
    try {
      const payment = await this.prisma.paymentHistory.update({
        where: { id },
        data: updatePaymentHistoryDto,
      });

      if (updatePaymentHistoryDto.paymentStatus == PaymentStatus.COMPLETED) {
        // update user membership
        await this.prisma.user.update({
          where: { id: payment.userId },
          data: {
            membership: Membership.VERIFIED,
            membershipValidUntil: new Date(
              new Date().setMonth(new Date().getMonth() + 1),
            ),
          },
        });
      }
    } catch (error) {
      throw new Error(`Error updating payment history: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.paymentHistory.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Error deleting payment history: ${error.message}`);
    }
  }
}

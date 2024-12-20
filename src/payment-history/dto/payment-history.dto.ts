import { PartialType } from '@nestjs/mapped-types';
import { PaymentStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentHistoryDto {
  @ApiProperty({ type: 'string', required: true })
  title: string;

  @ApiProperty({ type: 'string', required: true })
  userId: string;

  @ApiProperty({ type: 'string', required: false })
  paymentId?: string;

  @ApiProperty({ type: 'number', required: true })
  amount: number;

  @ApiProperty({ enum: PaymentStatus, required: false })
  paymentStatus?: PaymentStatus;
}

export class UpdatePaymentHistoryDto extends PartialType(
  CreatePaymentHistoryDto,
) {}

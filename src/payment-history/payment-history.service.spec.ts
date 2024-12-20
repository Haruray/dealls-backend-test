import { Test, TestingModule } from '@nestjs/testing';
import { PaymentHistoryService } from './payment-history.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatePaymentHistoryDto,
  UpdatePaymentHistoryDto,
} from './dto/payment-history.dto';

describe('PaymentHistoryService', () => {
  let service: PaymentHistoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentHistoryService, PrismaService],
    }).compile();

    service = module.get<PaymentHistoryService>(PaymentHistoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a payment history', async () => {
    const createPaymentHistoryDto: CreatePaymentHistoryDto = {
      userId: '1',
      title: 'Payment for subscription',
      amount: 100,
      paymentStatus: 'COMPLETED',
    };

    jest
      .spyOn(prisma.paymentHistory, 'create')
      .mockResolvedValue(createPaymentHistoryDto as any);

    expect(await service.create(createPaymentHistoryDto)).toEqual(
      createPaymentHistoryDto,
    );
  });

  it('should find all payment histories', async () => {
    const paymentHistories = [
      {
        id: '1',
        userId: '1',
        title: 'Payment for subscription',
        amount: 100,
        paymentStatus: 'COMPLETED',
      },
    ];
    jest
      .spyOn(prisma.paymentHistory, 'findMany')
      .mockResolvedValue(paymentHistories as any);

    expect(await service.findAll()).toEqual(paymentHistories);
  });

  it('should find one payment history by id', async () => {
    const paymentHistory = {
      id: '1',
      userId: '1',
      title: 'Payment for subscription',
      amount: 100,
      paymentStatus: 'COMPLETED',
    };
    jest
      .spyOn(prisma.paymentHistory, 'findUnique')
      .mockResolvedValue(paymentHistory as any);

    expect(await service.findOne('1')).toEqual(paymentHistory);
  });

  it('should update a payment history', async () => {
    const updatePaymentHistoryDto: UpdatePaymentHistoryDto = {
      userId: '1',
      title: 'Updated payment for subscription',
      amount: 150,
      paymentStatus: 'COMPLETED',
    };

    jest
      .spyOn(prisma.paymentHistory, 'update')
      .mockResolvedValue(updatePaymentHistoryDto as any);

    expect(await service.update('1', updatePaymentHistoryDto)).toEqual(
      updatePaymentHistoryDto,
    );
  });

  it('should remove a payment history', async () => {
    const paymentHistory = {
      id: '1',
      userId: '1',
      title: 'Payment for subscription',
      amount: 100,
      paymentStatus: 'COMPLETED',
    };
    jest
      .spyOn(prisma.paymentHistory, 'delete')
      .mockResolvedValue(paymentHistory as any);

    expect(await service.remove('1')).toEqual(paymentHistory);
  });
});

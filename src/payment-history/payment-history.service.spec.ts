import { Test, TestingModule } from '@nestjs/testing';
import { PaymentHistoryService } from './payment-history.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatePaymentHistoryDto,
  UpdatePaymentHistoryDto,
} from './dto/payment-history.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PaymentStatus } from '@prisma/client';

describe('PaymentHistoryService', () => {
  let service: PaymentHistoryService;
  let prisma: PrismaService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentHistoryService, PrismaService, UsersService],
    }).compile();

    service = module.get<PaymentHistoryService>(PaymentHistoryService);
    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);
  });

  //   afterEach(async () => {
  //     await prisma.paymentHistory.deleteMany({});
  //     await prisma.user.deleteMany({});
  //   });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a payment history', async () => {
    const randomInt = Math.floor(Math.random() * 10000);
    const createUserDto: CreateUserDto = {
      name: 'User1',
      email: `user1_${randomInt}@example.com`,
      password: 'password',
      nickname: 'user1',
      gender: 'MALE',
      birthdate: new Date(),
      photo: 'photo1.jpg',
      interests: 'coding',
      membership: 'FREE',
    };

    const user = await usersService.create(createUserDto);

    const createPaymentHistoryDto: CreatePaymentHistoryDto = {
      userId: user.id,
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

  it('should create a user, create a payment history, then find one', async () => {
    const randomInt = Math.floor(Math.random() * 10000);
    const createUserDto: CreateUserDto = {
      name: 'User1',
      email: `user1_${randomInt}@example.com`,
      password: 'password',
      nickname: 'user1',
      gender: 'MALE',
      birthdate: new Date(),
      photo: 'photo1.jpg',
      interests: 'coding',
      membership: 'FREE',
    };

    const user = await usersService.create(createUserDto);

    const createPaymentHistoryDto: CreatePaymentHistoryDto = {
      userId: user.id,
      title: 'Payment for subscription',
      amount: 100,
      paymentStatus: PaymentStatus.COMPLETED,
    };

    const paymentHistory = await service.create(createPaymentHistoryDto);

    jest
      .spyOn(prisma.paymentHistory, 'findUnique')
      .mockResolvedValue(paymentHistory as any);

    expect(await service.findOne(paymentHistory.id)).toEqual(paymentHistory);
  });

  it('should update a payment history', async () => {
    const randomInt = Math.floor(Math.random() * 10000);
    const createUserDto: CreateUserDto = {
      name: 'User1',
      email: `user1_${randomInt}@example.com`,
      password: 'password',
      nickname: 'user1',
      gender: 'MALE',
      birthdate: new Date(),
      photo: 'photo1.jpg',
      interests: 'coding',
      membership: 'FREE',
    };

    const user = await usersService.create(createUserDto);

    const updatePaymentHistoryDto: UpdatePaymentHistoryDto = {
      userId: user.id,
      title: 'Updated payment for subscription',
      amount: 150,
      paymentStatus: PaymentStatus.COMPLETED,
    };

    const createPaymentHistoryDto = {
      userId: user.id,
      title: 'Payment for subscription',
      amount: 100,
      paymentStatus: PaymentStatus.PENDING,
    };

    const paymentHistory = await service.create(createPaymentHistoryDto);

    jest
      .spyOn(prisma.paymentHistory, 'update')
      .mockResolvedValue(updatePaymentHistoryDto as any);

    expect(
      await service.update(paymentHistory.id, updatePaymentHistoryDto),
    ).toEqual(updatePaymentHistoryDto);
  });

  it('should remove a payment history', async () => {
    const randomInt = Math.floor(Math.random() * 10000);
    const createUserDto: CreateUserDto = {
      name: 'User1',
      email: `user1_${randomInt}@example.com`,
      password: 'password',
      nickname: 'user1',
      gender: 'MALE',
      birthdate: new Date(),
      photo: 'photo1.jpg',
      interests: 'coding',
      membership: 'FREE',
    };

    const user = await usersService.create(createUserDto);

    const paymentHistory: CreatePaymentHistoryDto = {
      userId: user.id,
      title: 'Payment for subscription',
      amount: 100,
      paymentStatus: PaymentStatus.COMPLETED,
    };

    const createdPaymentHistory = await service.create(paymentHistory);

    jest
      .spyOn(prisma.paymentHistory, 'delete')
      .mockResolvedValue(paymentHistory as any);

    expect(await service.remove(createdPaymentHistory.id)).toEqual(
      paymentHistory,
    );
  });
});

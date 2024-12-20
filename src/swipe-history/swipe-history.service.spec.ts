import { Test, TestingModule } from '@nestjs/testing';
import { SwipeHistoryService } from './swipe-history.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSwipeHistoryDto } from './dto/create-swipe-history.dto';
import { UpdateSwipeHistoryDto } from './dto/update-swipe-history.dto';

describe('SwipeHistoryService', () => {
  let service: SwipeHistoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwipeHistoryService, PrismaService],
    }).compile();

    service = module.get<SwipeHistoryService>(SwipeHistoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a swipe history', async () => {
    const createSwipeHistoryDto: CreateSwipeHistoryDto = {
      userId: '1',
      swipedUserId: '2',
      liked: true,
    };

    jest
      .spyOn(prisma.swipeHistory, 'create')
      .mockResolvedValue(createSwipeHistoryDto as any);

    expect(await service.create(createSwipeHistoryDto)).toEqual(
      createSwipeHistoryDto,
    );
  });

  it('should find all swipe histories', async () => {
    const swipeHistories = [
      { id: '1', userId: '1', swipedUserId: '2', liked: true },
    ];
    jest
      .spyOn(prisma.swipeHistory, 'findMany')
      .mockResolvedValue(swipeHistories as any);

    expect(await service.findAll()).toEqual(swipeHistories);
  });

  it('should find one swipe history by id', async () => {
    const swipeHistory = {
      id: '1',
      userId: '1',
      swipedUserId: '2',
      liked: true,
    };
    jest
      .spyOn(prisma.swipeHistory, 'findUnique')
      .mockResolvedValue(swipeHistory as any);

    expect(await service.findOne('1')).toEqual(swipeHistory);
  });

  it('should update a swipe history', async () => {
    const updateSwipeHistoryDto: UpdateSwipeHistoryDto = {
      userId: '1',
      swipedUserId: '2',
      liked: false,
    };

    jest
      .spyOn(prisma.swipeHistory, 'update')
      .mockResolvedValue(updateSwipeHistoryDto as any);

    expect(await service.update('1', updateSwipeHistoryDto)).toEqual(
      updateSwipeHistoryDto,
    );
  });

  it('should remove a swipe history', async () => {
    const swipeHistory = {
      id: '1',
      userId: '1',
      swipedUserId: '2',
      liked: true,
    };
    jest
      .spyOn(prisma.swipeHistory, 'delete')
      .mockResolvedValue(swipeHistory as any);

    expect(await service.remove('1')).toEqual(swipeHistory);
  });
});

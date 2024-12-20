import { Test, TestingModule } from '@nestjs/testing';
import { SwipeHistoryService } from './swipe-history.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSwipeHistoryDto } from './dto/create-swipe-history.dto';
import { UpdateSwipeHistoryDto } from './dto/update-swipe-history.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Membership } from '@prisma/client';

describe('SwipeHistoryService', () => {
  let service: SwipeHistoryService;
  let prisma: PrismaService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwipeHistoryService, PrismaService, UsersService],
    }).compile();

    service = module.get<SwipeHistoryService>(SwipeHistoryService);
    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);
  });

//   afterEach(async () => {
//     await prisma.swipeHistory.deleteMany({});
//     await prisma.user.deleteMany({});
//   });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a swipe history', async () => {
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
      membership: Membership.FREE,
    };

    const user1 = await usersService.create(createUserDto);

    const createUserDto2: CreateUserDto = {
      name: 'User2',
      email: `user2_${randomInt}@example.com`,
      password: 'password',
      nickname: 'user2',
      gender: 'FEMALE',
      birthdate: new Date(),
      photo: 'photo2.jpg',
      interests: 'reading',
      membership: Membership.FREE,
    };

    const user2 = await usersService.create(createUserDto2);

    const createSwipeHistoryDto: CreateSwipeHistoryDto = {
      userId: user1.id,
      swipedUserId: user2.id,
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

it('should create a user, create a swipe history, then find one swipe history by id', async () => {
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
        membership: Membership.FREE,
    };

    const user1 = await usersService.create(createUserDto);

    const createUserDto2: CreateUserDto = {
        name: 'User2',
        email: `user2_${randomInt}@example.com`,
        password: 'password',
        nickname: 'user2',
        gender: 'FEMALE',
        birthdate: new Date(),
        photo: 'photo2.jpg',
        interests: 'reading',
        membership: Membership.FREE,
    };

    const user2 = await usersService.create(createUserDto2);

    const createSwipeHistoryDto: CreateSwipeHistoryDto = {
        userId: user1.id,
        swipedUserId: user2.id,
        liked: true,
    };

    const createdSwipeHistory = await service.create(createSwipeHistoryDto);

    jest
        .spyOn(prisma.swipeHistory, 'findUnique')
        .mockResolvedValue(createdSwipeHistory as any);

    expect(await service.findOne(createdSwipeHistory.id)).toEqual(createdSwipeHistory);
});

  it('should update a swipe history', async () => {
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
      membership: Membership.FREE,
    };

    const user1 = await usersService.create(createUserDto);

    const createUserDto2: CreateUserDto = {
      name: 'User2',
      email: `user2_${randomInt}@example.com`,
      password: 'password',
      nickname: 'user2',
      gender: 'FEMALE',
      birthdate: new Date(),
      photo: 'photo2.jpg',
      interests: 'reading',
      membership: Membership.FREE,
    };

    const user2 = await usersService.create(createUserDto2);

    const updateSwipeHistoryDto: UpdateSwipeHistoryDto = {
      userId: user1.id,
      swipedUserId: user2.id,
      liked: false,
    };

    //create a swipe history

    const swipeHistory = {
      userId: user1.id,
      swipedUserId: user2.id,
      liked: true,
    };

    const createdSwipeHistory = await service.create(swipeHistory);

    jest
      .spyOn(prisma.swipeHistory, 'update')
      .mockResolvedValue(updateSwipeHistoryDto as any);

    expect(await service.update(createdSwipeHistory.id, updateSwipeHistoryDto)).toEqual(
      updateSwipeHistoryDto,
    );
  });

  it('should remove a swipe history', async () => {
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
      membership: Membership.FREE,
    };

    const user1 = await usersService.create(createUserDto);

    const createUserDto2: CreateUserDto = {
      name: 'User2',
      email: `user2_${randomInt}@example.com`,
      password: 'password',
      nickname: 'user2',
      gender: 'FEMALE',
      birthdate: new Date(),
      photo: 'photo2.jpg',
      interests: 'reading',
      membership: Membership.FREE,
    };

    const user2 = await usersService.create(createUserDto2);

    const swipeHistory = {
      id: '1',
      userId: user1.id,
      swipedUserId: user2.id,
      liked: true,
    };
    jest
      .spyOn(prisma.swipeHistory, 'delete')
      .mockResolvedValue(swipeHistory as any);

    expect(await service.remove('1')).toEqual(swipeHistory);
  });
});

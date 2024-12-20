import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

describe('MatchService', () => {
  let service: MatchService;
  let prisma: PrismaService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchService, PrismaService, UsersService],
    }).compile();

    service = module.get<MatchService>(MatchService);
    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);
  });

  //   afterEach(async () => {
  //     await prisma.match.deleteMany({});
  //     await prisma.user.deleteMany({});
  //   });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a match', async () => {
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
      membership: 'FREE',
    };

    const user2 = await usersService.create(createUserDto2);

    const createMatchDto: CreateMatchDto = {
      userId: user1.id,
      matchedUserId: user2.id,
    };

    jest.spyOn(prisma.match, 'create').mockResolvedValue(createMatchDto as any);

    expect(await service.create(createMatchDto)).toEqual(createMatchDto);
  });

  it('should find all matches', async () => {
    expect(await service.findAll()).toBeDefined();
  });

  it('should find one match by id', async () => {
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
      membership: 'FREE',
    };

    const user2 = await usersService.create(createUserDto2);

    const createMatchDto: CreateMatchDto = {
      userId: user1.id,
      matchedUserId: user2.id,
    };

    const allMatches = await service.findAll();
    let match = null;
    if (!allMatches.length) {
      match = await service.create(createMatchDto);
    } else {
      match = allMatches[0];
    }

    jest.spyOn(prisma.match, 'findUnique').mockResolvedValue(match as any);

    expect(await service.findOne(match.id)).toEqual(match);
  });

  it('should update a match', async () => {
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
      membership: 'FREE',
    };

    const user2 = await usersService.create(createUserDto2);

    const createMatchDto: CreateMatchDto = {
      userId: user1.id,
      matchedUserId: user2.id,
    };

    const updateMatchDto: UpdateMatchDto = {
      userId: user1.id,
      matchedUserId: user2.id,
    };

    const allMatches = await service.findAll();
    let match = null;
    if (!allMatches.length) {
      match = await service.create(createMatchDto);
    } else {
      match = allMatches[0];
    }

    jest.spyOn(prisma.match, 'update').mockResolvedValue(updateMatchDto as any);

    expect(await service.update(match.id, updateMatchDto)).toEqual(
      updateMatchDto,
    );
  });

  it('should remove a match', async () => {
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
      membership: 'FREE',
    };

    const user2 = await usersService.create(createUserDto2);

    const createMatchDto: CreateMatchDto = {
      userId: user1.id,
      matchedUserId: user2.id,
    };

    const allMatches = await service.findAll();
    let match = null;
    if (!allMatches.length) {
      match = await service.create(createMatchDto);
    } else {
      match = allMatches[0];
    }

    jest.spyOn(prisma.match, 'delete').mockResolvedValue(match as any);

    expect(await service.remove(match.id)).toEqual(match);
  });
});

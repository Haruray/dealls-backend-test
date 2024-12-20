import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Gender, Membership } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John',
      email: 'john@example.com',
      password: 'password',
      nickname: 'johnny',
      gender: Gender.MALE,
      birthdate: new Date(),
      photo: 'photo_url',
      interests: 'coding, reading',
      membership: Membership.FREE,
    };

    jest.spyOn(prisma.user, 'create').mockResolvedValue(createUserDto as any);

    expect(await service.create(createUserDto)).toEqual(createUserDto);
  });

  it('should find all users', async () => {
    expect(await service.findAll()).toBeDefined();
  });

  it('should create a user and then find one by id', async () => {
    const randomInt = Math.floor(Math.random() * 10000);
    const createUserDto: CreateUserDto = {
      name: randomInt.toString(),
      email: `${randomInt}@example.com`,
      password: 'password',
      nickname: 'jane',
      gender: Gender.FEMALE,
      birthdate: new Date(),
      photo: 'photo_url',
      interests: 'music, sports',
      membership: Membership.VERIFIED,
    };

    const createdUser = await service.create(createUserDto);

    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(createdUser as any);

    expect(await service.findOne(createdUser.id)).toEqual(createdUser);
  });


  it('should create a user and then update it', async () => {
    const randomInt = Math.floor(Math.random() * 10000);
    const createUserDto: CreateUserDto = {
      name: 'Alice',
      email: `alice${randomInt}@example.com`,
      password: 'password',
      nickname: 'alice',
      gender: Gender.FEMALE,
      birthdate: new Date(),
      photo: 'photo_url',
      interests: 'art, travel',
      membership: Membership.FREE,
    };

    const updateUserDto: UpdateUserDto = {
      name: 'Alice Updated',
      email: `alice${randomInt}@example.com`,
      password: 'newpassword',
      nickname: 'alice',
      gender: Gender.FEMALE,
      birthdate: new Date(),
      photo: 'new_photo_url',
      interests: 'art, travel',
      membership: Membership.FREE,
    };

    jest.spyOn(prisma.user, 'update').mockResolvedValue(updateUserDto as any);

    const createdUser = await service.create(createUserDto);

    expect(await service.update(createdUser.id, updateUserDto)).toEqual(updateUserDto);
  });


it('should create a user and then delete it', async () => {
  const randomInt = Math.floor(Math.random() * 10000);
  const createUserDto: CreateUserDto = {
    name: 'Bob',
    email: `${randomInt}@example.com`,
    password: 'password',
    nickname: 'bobby',
    gender: Gender.MALE,
    birthdate: new Date(),
    photo: 'photo_url',
    interests: 'gaming, hiking',
    membership: Membership.FREE,
  };

  const createdUser = await service.create(createUserDto);

  jest.spyOn(prisma.user, 'delete').mockResolvedValue(createdUser as any);

  expect(await service.remove(createdUser.id)).toEqual(createdUser);
});
});

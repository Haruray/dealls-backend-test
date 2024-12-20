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
    const users = [{ id: '1', email: 'john@example.com' }];
    jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users as any);

    expect(await service.findAll()).toEqual(users);
  });

  it('should find one user by id', async () => {
    const user = { id: '1', email: 'john@example.com' };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user as any);

    expect(await service.findOne('1')).toEqual(user);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'John Updated',
      email: 'john.updated@example.com',
      password: 'newpassword',
      nickname: 'johnny',
      gender: Gender.MALE,
      birthdate: new Date(),
      photo: 'new_photo_url',
      interests: 'coding, reading',
      membership: Membership.FREE,
    };

    jest.spyOn(prisma.user, 'update').mockResolvedValue(updateUserDto as any);

    expect(await service.update('1', updateUserDto)).toEqual(updateUserDto);
  });

  it('should remove a user', async () => {
    const user = { id: '1', email: 'john@example.com' };
    jest.spyOn(prisma.user, 'delete').mockResolvedValue(user as any);

    expect(await service.remove('1')).toEqual(user);
  });
});

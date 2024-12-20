import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

describe('MatchService', () => {
  let service: MatchService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchService, PrismaService],
    }).compile();

    service = module.get<MatchService>(MatchService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a match', async () => {
    const createMatchDto: CreateMatchDto = {
      userId: '1',
      matchedUserId: '2',
    };

    jest.spyOn(prisma.match, 'create').mockResolvedValue(createMatchDto as any);

    expect(await service.create(createMatchDto)).toEqual(createMatchDto);
  });

  it('should find all matches', async () => {
    const matches = [{ id: '1', userId: '1', matchedUserId: '2' }];
    jest.spyOn(prisma.match, 'findMany').mockResolvedValue(matches as any);

    expect(await service.findAll()).toEqual(matches);
  });

  it('should find one match by id', async () => {
    const match = { id: '1', userId: '1', matchedUserId: '2' };
    jest.spyOn(prisma.match, 'findUnique').mockResolvedValue(match as any);

    expect(await service.findOne('1')).toEqual(match);
  });

  it('should update a match', async () => {
    const updateMatchDto: UpdateMatchDto = {
      userId: '1',
      matchedUserId: '2',
    };

    jest.spyOn(prisma.match, 'update').mockResolvedValue(updateMatchDto as any);

    expect(await service.update('1', updateMatchDto)).toEqual(updateMatchDto);
  });

  it('should remove a match', async () => {
    const match = { id: '1', userId: '1', matchedUserId: '2' };
    jest.spyOn(prisma.match, 'delete').mockResolvedValue(match as any);

    expect(await service.remove('1')).toEqual(match);
  });
});

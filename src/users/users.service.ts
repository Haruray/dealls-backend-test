import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcryptjs';
import { Membership, Gender } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(public prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(createUserDto.password, 10);
    return await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        nickname: createUserDto.nickname,
        gender: createUserDto.gender as Gender,
        birthdate: createUserDto.birthdate,
        photo: createUserDto.photo,
        interests: createUserDto.interests,
        membership: createUserDto.membership as Membership,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const hashedPassword = await hash(updateUserDto.password, 10);
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: hashedPassword,
        nickname: updateUserDto.nickname,
        gender: updateUserDto.gender as Gender,
        birthdate: updateUserDto.birthdate,
        photo: updateUserDto.photo,
        interests: updateUserDto.interests,
        membership: updateUserDto.membership as Membership,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}

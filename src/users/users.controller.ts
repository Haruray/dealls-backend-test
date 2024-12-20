import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const result = await this.usersService.create(createUserDto);
      return res.json({ message: 'User created successfully', data: result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error creating user', error: error.message });
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const result = await this.usersService.findAll();
      return res.json({
        message: 'Users retrieved successfully',
        data: result,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error retrieving users', error: error.message });
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.usersService.findOne(id);
      return res.json({ message: 'User retrieved successfully', data: result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error retrieving user', error: error.message });
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.usersService.update(id, updateUserDto);
      return res.json({ message: 'User updated successfully', data: result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error updating user', error: error.message });
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.usersService.remove(id);
      return res.json({ message: 'User deleted successfully', data: result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error deleting user', error: error.message });
    }
  }
}

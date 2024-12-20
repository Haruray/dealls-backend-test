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
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createMatchDto: CreateMatchDto, @Res() res: Response) {
    try {
      const result = await this.matchService.create(createMatchDto);
      return res.json({ message: 'Match created successfully', data: result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error creating match', error: error.message });
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.matchService.findOne(id);
      return res.json({
        message: 'Match retrieved successfully',
        data: result,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error retrieving match', error: error.message });
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMatchDto: UpdateMatchDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.matchService.update(id, updateMatchDto);
      return res.json({ message: 'Match updated successfully', data: result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error updating match', error: error.message });
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.matchService.remove(id);
      return res.json({ message: 'Match deleted successfully', data: result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error deleting match', error: error.message });
    }
  }
}

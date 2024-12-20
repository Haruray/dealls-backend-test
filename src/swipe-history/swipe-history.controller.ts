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
import { SwipeHistoryService } from './swipe-history.service';
import { CreateSwipeHistoryDto } from './dto/create-swipe-history.dto';
import { UpdateSwipeHistoryDto } from './dto/update-swipe-history.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('swipe-history')
export class SwipeHistoryController {
  constructor(private readonly swipeHistoryService: SwipeHistoryService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createSwipeHistoryDto: CreateSwipeHistoryDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.swipeHistoryService.create(
        createSwipeHistoryDto,
      );
      return res.json({
        message: 'Swipe history created successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating swipe history',
        error: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.swipeHistoryService.findOne(id);
      return res.json({
        message: 'Swipe history retrieved successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error retrieving swipe history',
        error: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSwipeHistoryDto: UpdateSwipeHistoryDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.swipeHistoryService.update(
        id,
        updateSwipeHistoryDto,
      );
      return res.json({
        message: 'Swipe history updated successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating swipe history',
        error: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.swipeHistoryService.remove(id);
      return res.json({
        message: 'Swipe history deleted successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting swipe history',
        error: error.message,
      });
    }
  }
}

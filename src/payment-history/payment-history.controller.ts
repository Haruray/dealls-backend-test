import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { PaymentHistoryService } from './payment-history.service';
import {
  CreatePaymentHistoryDto,
  UpdatePaymentHistoryDto,
} from './dto/payment-history.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('payment-history')
export class PaymentHistoryController {
  constructor(private readonly paymentHistoryService: PaymentHistoryService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createPaymentHistoryDto: CreatePaymentHistoryDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.paymentHistoryService.create(
        createPaymentHistoryDto,
      );
      return res.json({
        message: 'Payment history created successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating payment history',
        error: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const result = await this.paymentHistoryService.findAll();
      return res.json({
        message: 'Payment histories retrieved successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error retrieving payment histories',
        error: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.paymentHistoryService.findOne(id);
      return res.json({
        message: 'Payment history retrieved successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error retrieving payment history',
        error: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentHistoryDto: UpdatePaymentHistoryDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.paymentHistoryService.update(
        id,
        updatePaymentHistoryDto,
      );
      return res.json({
        message: 'Payment history updated successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating payment history',
        error: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.paymentHistoryService.remove(id);
      return res.json({
        message: 'Payment history deleted successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting payment history',
        error: error.message,
      });
    }
  }
}

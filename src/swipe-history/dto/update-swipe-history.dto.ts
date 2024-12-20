import { PartialType } from '@nestjs/mapped-types';
import { CreateSwipeHistoryDto } from './create-swipe-history.dto';

export class UpdateSwipeHistoryDto extends PartialType(CreateSwipeHistoryDto) {}

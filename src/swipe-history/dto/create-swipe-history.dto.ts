import { ApiProperty } from '@nestjs/swagger';

export class CreateSwipeHistoryDto {
  @ApiProperty({ type: 'string', format: 'date-time', required: false })
  date?: Date;

  @ApiProperty({ type: 'string', required: true })
  userId: string;

  @ApiProperty({ type: 'string', required: true })
  swipedUserId: string;

  @ApiProperty({ type: 'boolean', required: true })
  liked: boolean;
}

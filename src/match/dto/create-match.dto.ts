import { ApiProperty } from '@nestjs/swagger';

export class CreateMatchDto {
  @ApiProperty({ type: 'string', format: 'date-time', required: false })
  date?: Date;

  @ApiProperty({ type: 'string', required: true })
  userId: string;

  @ApiProperty({ type: 'string', required: true })
  matchedUserId: string;
}

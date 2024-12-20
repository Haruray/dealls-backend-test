import { Gender, Membership } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: 'string', required: true })
  password: string;

  @ApiProperty({ type: 'string', required: true })
  email: string;

  @ApiProperty({ type: 'string', required: true })
  name: string;

  @ApiProperty({ type: 'string', required: false })
  nickname?: string;

  @ApiProperty({ enum: Gender, required: false })
  gender?: Gender;

  @ApiProperty({ type: 'string', format: 'date-time', required: false })
  birthdate?: Date;

  @ApiProperty({ type: 'string', required: false })
  photo?: string;

  @ApiProperty({ type: 'string', required: false })
  interests?: string;

  @ApiProperty({ enum: Membership, required: false })
  membership?: Membership;
}

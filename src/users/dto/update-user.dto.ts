import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: 'string', required: false })
  readonly newField1?: string;

  @ApiProperty({ type: 'number', required: false })
  readonly newField2?: number;
}

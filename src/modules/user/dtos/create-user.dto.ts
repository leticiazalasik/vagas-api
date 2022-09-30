import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from 'src/shared/utils/userRole/userRole';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  type: UserRole;
}

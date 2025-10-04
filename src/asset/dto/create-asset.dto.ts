import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetDto {
  @ApiProperty({ example: 'Laptop HP', description: 'Nombre del asset' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Laptop', description: 'Tipo de asset' })
  @IsNotEmpty({ message: 'El tipo es obligatorio' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'Juan Perez', description: 'Propietario del asset' })
  @IsNotEmpty({ message: 'El owner es obligatorio' })
  @IsString()
  owner: string;
}

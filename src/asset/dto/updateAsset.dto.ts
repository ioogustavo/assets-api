import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateAssetDto } from './createAsset.dto';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {
  @ApiPropertyOptional({
    example: 'Laptop HP',
    description: 'Nombre del asset',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Laptop', description: 'Tipo de asset' })
  @IsOptional()
  @IsNotEmpty({ message: 'El tipo no puede estar vacío' })
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    example: 'Juan Perez',
    description: 'Propietario del asset',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'El owner no puede estar vacío' })
  @IsString()
  owner?: string;
}

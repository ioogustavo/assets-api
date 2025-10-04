import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AssetService } from '../services/asset.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateAssetDto } from '../dto/updateAsset.dto';
import { CreateAssetDto } from '../dto/createAsset.dto';
import { AssetResponseDto } from '../dto/responseAsset.dto';

@ApiTags('Assets')
@Controller()
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('create')
  @ApiOperation({ summary: 'Crea un asset en el inventario' })
  @ApiResponse({
    status: 201,
    description: 'Asset creado correctamente',
  })
  create(@Body() createAssetDto: CreateAssetDto): Promise<AssetResponseDto> {
    return this.assetService.create(createAssetDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Lista todos los assets del inventario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de assets obtenida correctamente',
  })
  getAll(): Promise<AssetResponseDto[]> {
    return this.assetService.findAll();
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Actualiza un asset' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Asset actualizado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Asset no encontrado',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAssetDto: UpdateAssetDto,
  ): Promise<AssetResponseDto> {
    return this.assetService.update(id, updateAssetDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Elimina un asset' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Asset eliminado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Asset no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.assetService.remove(id);
  }
}

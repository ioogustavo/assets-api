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
import { UpdateAssetDto } from '../dto/update-asset.dto';
import { CreateAssetDto } from '../dto/create-asset.dto';

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
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.getHello(createAssetDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Lista todos los assets del inventario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de assets obtenida correctamente',
  })
  getHello2(): string {
    return this.assetService.getHello();
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
  ) {
    return this.assetService.getHello();
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
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.assetService.getHello();
  }
}

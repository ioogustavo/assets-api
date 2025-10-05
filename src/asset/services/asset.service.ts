import { Injectable, NotFoundException } from '@nestjs/common';
//import { PrismaService } from 'prisma/prisma.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAssetDto } from '../dto/createAsset.dto';
import { AssetResponseDto } from '../dto/responseAsset.dto';
import { UpdateAssetDto } from '../dto/updateAsset.dto';

@Injectable()
export class AssetService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAssetDto: CreateAssetDto): Promise<AssetResponseDto> {
    return this.prisma.assets.create({
      data: createAssetDto,
    });
  }

  async findAll(): Promise<AssetResponseDto[]> {
    return this.prisma.assets.findMany();
  }

  async update(
    id: number,
    updateAssetDto: UpdateAssetDto,
  ): Promise<AssetResponseDto> {
    const asset = await this.prisma.assets.findUnique({ where: { id } });

    if (!asset) throw new NotFoundException(`Asset con id ${id} no encontrado`);

    const updateAsset = await this.prisma.assets.update({
      where: { id },
      data: {
        ...updateAssetDto,
        updated_at: new Date(),
      },
    });
    return updateAsset;
  }

  async remove(id: number): Promise<string> {
    const asset = await this.prisma.assets.findUnique({ where: { id } });
    if (!asset) throw new NotFoundException(`Asset con id ${id} no encontrado`);

    await this.prisma.assets.delete({ where: { id } });

    return 'Asset correctamente eliminado';
  }
}

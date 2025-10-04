import { Module } from '@nestjs/common';
import { AssetController } from './controller/asset.controller';
import { AssetService } from './services/asset.service';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [AssetController],
  providers: [AssetService, PrismaService],
})
export class AssetModule {}

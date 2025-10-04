import { Module } from '@nestjs/common';
import { AssetController } from './controller/asset.controller';
import { AssetService } from './services/asset.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}

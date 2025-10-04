import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [PrismaModule, AssetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

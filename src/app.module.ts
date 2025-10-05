import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AssetModule } from './asset/asset.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, AssetModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

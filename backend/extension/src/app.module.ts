import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [PrismaModule, UrlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

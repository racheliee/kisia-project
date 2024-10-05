import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UrlModule } from './url/url.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [PrismaModule, UrlModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

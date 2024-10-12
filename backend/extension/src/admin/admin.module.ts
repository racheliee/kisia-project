import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ModelModule } from './model/model.module';
import { AdminService } from './admin.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AdminController],
  imports: [ModelModule, PrismaModule],
  providers: [AdminService],
})
export class AdminModule {}

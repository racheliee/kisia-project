import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ModelModule } from './model/model.module';

@Module({
  controllers: [AdminController],
  imports: [ModelModule],
})
export class AdminModule {}

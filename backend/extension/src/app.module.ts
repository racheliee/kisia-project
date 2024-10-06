import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UrlModule } from './url/url.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    PrismaModule,
    UrlModule,
    AdminModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(8000),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        PASSWORD_SALT_OR_ROUNDS: Joi.string().required(),
        GOOGLE_WEB_RISK_API_KEY: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

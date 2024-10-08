import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger = new Logger(UserService.name);

  // find user by id
  async findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id: id },
    });
  }

  // find user by email
  async findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  // find user by username
  async findOneByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: { username },
    });
  }

  // update user
  async update(id: string, data: Partial<User>) {
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  // check if refresh toekn matches with user
  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    this.logger.log('Checking if refresh token matches user');
    const user = await this.findOne(userId);

    if (!user || !user.refreshToken) {
      this.logger.log('User not found or no refresh token');
      return null;
    }

    // Compare provided refresh token with stored hashed token
    const isMatching = await bcrypt.compare(refreshToken, user.refreshToken);

    return isMatching ? user : null;
  }
}

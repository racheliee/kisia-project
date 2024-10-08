import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

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
}

import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { FeebackDTO } from './dto/feedback.dto';

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
    const user = await this.findOne(userId);

    if (!user || !user.refreshToken) {
      this.logger.error('User not found or no refresh token');
      return null;
    }

    // Compare provided refresh token with stored hashed token
    const isMatching = await bcrypt.compare(refreshToken, user.refreshToken);

    return isMatching ? user : null;
  }

  // post feedback
  async postFeedback(feedbackDTO: FeebackDTO) {
    // check if source is valid
    // if (feedbackDTO.source > 2 || feedbackDTO.source < 0) {
    //   throw new Error('Invalid source. Must be 0, 1, or 2');
    // }

    // find the url
    const url = await this.prismaService.url.findFirst({
      where: {url: feedbackDTO.url}
    })

    if (!url) {
      throw new Error('URL not found');
    }

    // add the feedback
    if(feedbackDTO.predicted) { // predicted as malicious (true) => then falsePos++
      await this.prismaService.url.update({
        where: {id: url.id},
        data: {
          falsePos: {
            increment: 1
          }
        }
      })
    }else{
      await this.prismaService.url.update({ // predicted as benign (false) => then falseNeg++
        where: {id: url.id},
        data: {
          falseNeg: {
            increment: 1
          }
        }
      })
    }

    return;
  }

  // get history
  async getHistory(userId: string) {
    const userHistory = await this.prismaService.user.findMany({
      where: {id: userId},
      select: {
        urlsAccessed: {
          select: {
            url: true,
            isMalicious: true,
            createdAt: true,
          }
        }
      }
    });

    if (!userHistory || userHistory.length === 0){
      return [];
    }

    this.logger.log(`User history: ${JSON.stringify(userHistory)}`);

    return userHistory;
  }
}

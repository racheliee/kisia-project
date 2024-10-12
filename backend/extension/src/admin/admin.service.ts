import { Injectable, Logger, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TotalRequestsQueryDTO } from './dto/totalrequest.dto';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);
  constructor(private readonly prismaService: PrismaService) {}

  // database overview
  async getDbOverview() {
    this.logger.log('Getting database overview');

    const size = await this.prismaService
      .$queryRaw`SELECT pg_size_pretty(pg_database_size(current_database())) as size;`;
    const totalUrls = await this.prismaService.url.count();
    const numMaliciousUrls = await this.prismaService.url.count({
      where: { isMalicious: true },
    });

    return {
      size: size[0].size,
      totalUrls,
      numMaliciousUrls,
    };
  }

  // todo: total requests
  async getTotalRequests(interval: string) {
    switch (interval) {
      case 'day':
        return this.prismaService.history.groupBy({
          by: ['createdAt'],
          orderBy: {
            createdAt: 'asc',
          },
          where: {
            createdAt: {
              gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 24 hours ago
            },
          },
          _count: {
            id: true,
          },
        });
      case 'week':
        return this.prismaService.history.groupBy({
          by: ['createdAt'],
          orderBy: {
            createdAt: 'asc',
          },
          _count: {
            id: true,
          },
        });
    }
  }

  async getTop5AccessedUrls() {
    const res = await this.prismaService.url.findMany({
      take: 5,
      orderBy: {
        accessCount: 'desc',
      },
      where: {
        // recent 30 days
        updatedAt: {
          gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    // map as url: accessCount
    return res.map((url) => {
      return {
        url: url.url,
        accessCount: url.accessCount,
        isMalicious: url.isMalicious,
      };
    });
  }

  async getTop5MaliciousUrls() {
    const res = await this.prismaService.url.findMany({
      take: 5,
      where: {
        isMalicious: true,
        updatedAt: {
          gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: {
        accessCount: 'desc',
      },
    });

    return res.map((url) => {
      return {
        url: url.url,
        accessCount: url.accessCount,
      };
    });
  }

  async getTop5FalseNeg() {
    const res = await this.prismaService.url.findMany({
      take: 5,
      orderBy: {
        falseNeg: 'desc',
      },
      where: {
        // recent 30 days
        updatedAt: {
          gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    return res.map((url) => {
      return {
        url: url.url,
        falseNegCount: url.falseNeg,
      };
    });
  }

  async getTop5FalsePos() {
    const res = await this.prismaService.url.findMany({
      take: 5,
      orderBy: {
        falsePos: 'desc',
      },
      where: {
        // recent 30 days
        updatedAt: {
          gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    return res.map((url) => {
      return {
        url: url.url,
        falsePosCount: url.falsePos,
      };
    });
  }

  async searchUrl(url: string) {
    const res = await this.prismaService.url.findFirst({
      where: {
        url: url,
      },
    });

    if (!res) {
      throw new Error('URL not found');
    }

    return {
      url: url,
      isMalicious: res.isMalicious,
      accessCount: res.accessCount,
      falseNeg: res.falseNeg,
      falsePos: res.falsePos,
      confidenceScore: res.confidenceScore,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
    };
  }

  async getTotalUsers() {
    return this.prismaService.user.count();
  }

  async getActiveUsers() {
    return this.prismaService.user.count({
      where: {
        lastLogin: {
          gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });
  }

  async getNewUsers() {
    return this.prismaService.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });
  }
}

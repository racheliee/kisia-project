import { Injectable, Logger, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestCountQueryDTO } from './dto/requestCountQuery.dto';
import { ModelType } from '@prisma/client';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);
  constructor(private readonly prismaService: PrismaService) {}

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

  // helper function to get total requests & ai requests
  getStartOfWeek(date: Date) {
    const day = date.getDay();
    const startOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - day + (day === 0 ? -6 : 1),
    );
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }

  // helper function to get total requests & ai requests
  getWeekLabel(start: Date, end: Date) {
    const startDate = `${start.getMonth() + 1}/${start.getDate()}`;
    const endDate = `${end.getMonth() + 1}/${end.getDate()}`;
    return `${startDate} - ${endDate}`;
  }

  async getRequests(interval: string, where?: Record<string, any>) {
    const now = new Date();

    switch (interval) {
      case 'hour':
        const hourResults = await this.prismaService.history.findMany({
          where: {
            ...where,
            createdAt: {
              gte: new Date(now.getTime() - 24 * 60 * 60 * 1000), // ms 이용, 최근 24시간
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        });

        // Group by hour using JS
        const hourlyGroups = hourResults.reduce(
          (acc, record) => {
            // acc is the accumulator to count the number of requests per hour, record is each record in the history table
            const hour = record.createdAt.getHours();
            if (!acc[hour]) {
              acc[hour] = 0;
            }
            acc[hour]++;
            return acc;
          },
          {} as Record<number, number>, // only keep the hour and count
        );

        return Object.entries(hourlyGroups).map(([hour, count]) => ({
          hour: `${hour}:00`,
          count,
        }));
      case 'day':
        const dayResults = await this.prismaService.history.findMany({
          where: {
            ...where,
            createdAt: {
              gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // recent 7 days
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        });

        const dailyGroups = {};
        dayResults.forEach((record) => {
          const recordDate = new Date(record.createdAt);
          const dayLabel = `${recordDate.getMonth() + 1}/${recordDate.getDate()}`;

          if (!dailyGroups[dayLabel]) {
            dailyGroups[dayLabel] = 0;
          }
          dailyGroups[dayLabel]++;
        });

        return Object.entries(dailyGroups).map(([day, count]) => ({
          day: `${day}`,
          count,
        }));

      case 'week':
        const weekResults = await this.prismaService.history.findMany({
          where: {
            ...where,
            createdAt: {
              gte: new Date(now.getTime() - 8 * 7 * 24 * 60 * 60 * 1000), // recent 8 weeks
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        });

        const weeklyGroups = {};
        weekResults.forEach((record) => {
          const recordDate = new Date(record.createdAt);
          const startOfWeek = this.getStartOfWeek(recordDate);
          const endOfWeek = new Date(
            startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000,
          );
          const label = this.getWeekLabel(startOfWeek, endOfWeek);

          if (!weeklyGroups[label]) {
            weeklyGroups[label] = 0;
          }
          weeklyGroups[label]++;
        });

        return Object.entries(weeklyGroups).map(([week, count]) => ({
          week: `${week}`,
          count,
        }));

      case 'month':
        const monthlyResults = await this.prismaService.history.findMany({
          where: {
            ...where,
            createdAt: {
              gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // recent 30 days
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        });

        const monthlyGroups = {};
        monthlyResults.forEach((record) => {
          const recordDate = new Date(record.createdAt);
          const monthLabel = `${recordDate.getMonth() + 1}`;

          if (!monthlyGroups[monthLabel]) {
            monthlyGroups[monthLabel] = 0;
          }
          monthlyGroups[monthLabel]++;
        });

        return Object.entries(monthlyGroups).map(([month, count]) => ({
          month: `${month}`,
          count,
        }));
    }
  }

  async getTotalRequests(interval: string) {
    return this.getRequests(interval);
  }

  async getAIRequests(interval: string, where?: Record<string, any>) {
    return this.getRequests(interval, where);
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

  async getConfusionMatrix(model?: string) {
    this.logger.log(`confusion matrix for model: ${model}`);
    if (model) {
      const databaseResult =
        await this.prismaService.confusionMatrix.findUnique({
          where: {
            modelType: model as ModelType,
          }
        });

      if (databaseResult) {
        this.logger.log(`Found confusion matrix for model: ${model}`);
        return {
          modelType: databaseResult.modelType,
          truePositive: databaseResult.truePos,
          trueNegative: databaseResult.trueNeg,
          falsePositive: databaseResult.falsePos,
          falseNegative: databaseResult.falseNeg,
        };
      }
    }else{
        const databaseResult = await this.prismaService.confusionMatrix.findMany();

        if (databaseResult) {
          this.logger.log(`Found confusion matrix for all models`);
          return databaseResult.map((result) => {
            return {
              modelType: result.modelType,
              truePositive: result.truePos,
              trueNegative: result.trueNeg,
              falsePositive: result.falsePos,
              falseNegative: result.falseNeg,
            };
          });
        }
    }
  }

  async getConfidenceHitRate() {
    const databaseResult = await this.prismaService.confidenceHitRate.findMany();

    if (databaseResult) {
      this.logger.log(`Found confidence hit rate for all models`);
      return databaseResult.map((result) => {
        return {
          confidenceRange: result.confidenceRange,
          count: result.count,
        };
      });
    }
  }
}

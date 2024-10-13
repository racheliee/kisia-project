import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Query,
} from '@nestjs/common';
import { AdminModule } from './admin.module';
import { AdminService } from './admin.service';
import { RequestCountQueryDTO } from './dto/requestCountQuery.dto';
import { UrlDto } from 'src/url/dto/url.dto';
import { modelQueryDTO } from './dto/modelQuery.dto';

@Controller('admin')
export class AdminController {
  private readonly logger = new Logger(AdminModule.name);
  constructor(private readonly adminService: AdminService) {}

  @Get('db-overview')
  async getDbOverview() {
    try {
      const result = await this.adminService.getDbOverview();
      return {
        statusCode: 200,
        message: 'Successfully retrieved database overview',
        data: {
          size: result.size,
          totalUrls: result.totalUrls,
          numMaliciousUrls: result.numMaliciousUrls,
        },
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error retrieving database overview');
    }
  }

  @Get('total-requests')
  async getTotalRequests(@Query() query: RequestCountQueryDTO) {
    try {
      this.logger.log(`Getting total requests`);
      return {
        statusCode: 200,
        message: 'Successfully retrieved total requests',
        data: await this.adminService.getTotalRequests(query.interval),
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error retrieving total requests');
    }
  }

  @Get('ai-requests')
  async getAIRequests(@Query() query: RequestCountQueryDTO) {
    try {
      this.logger.log(`Getting AI requests`);
      return {
        statusCode: 200,
        message: 'Successfully retrieved AI requests',
        data: await this.adminService.getAIRequests(query.interval, {
          detectedBy: 'AI_MODEL',
        }),
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error retrieving AI requests');
    }
  }

  @Get('top-urls')
  async getTop5AccessedUrls() {
    try {
      this.logger.log(`Getting top 5 accessed urls`);
      return {
        statusCode: 200,
        message: 'Successfully retrieved top 5 accessed urls',
        data: await this.adminService.getTop5AccessedUrls(),
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error retrieving top 5 accessed urls');
    }
  }

  @Get('top-malicious')
  async getTop5MaliciousUrls() {
    try {
      this.logger.log(`Getting top 5 malicious urls`);
      return {
        statusCode: 200,
        message: 'Successfully retrieved top 5 malicious urls',
        data: await this.adminService.getTop5MaliciousUrls(),
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error retrieving top 5 malicious urls');
    }
  }

  @Get('top-false-negative')
  async getTop5FalseNeg() {
    try {
      return {
        statusCode: 200,
        message: 'Successfully retrieved top 5 false negative urls',
        data: await this.adminService.getTop5FalseNeg(),
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error retrieving top 5 malicious urls');
    }
  }

  @Get('top-false-positive')
  async getTop5FalsePos() {
    try {
      this.logger.log(`Getting top 5 false positive urls`);
      return {
        statusCode: 200,
        message: 'Successfully retrieved top 5 false positive urls',
        data: await this.adminService.getTop5FalsePos(),
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error retrieving top 5 malicious urls');
    }
  }

  @Get('url-search')
  async searchUrl(@Body() url: UrlDto) {
    try {
      this.logger.log(`Searching url: ${url.url}`);
      return {
        statusCode: 200,
        message: 'Successfully retrieved url information',
        data: await this.adminService.searchUrl(url.url),
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error retrieving url information');
    }
  }

  @Get('total-users')
  async getTotalUsers() {
    try {
      this.logger.log(`Getting total users`);
      return {
        statusCode: 200,
        message: 'Successfully retrieved total users',
        data: await this.adminService.getTotalUsers(),
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error retrieving total users');
    }
  }

  @Get('active-users')
  async getActiveUsers() {
    try {
      this.logger.log(`Getting active users`);
      return {
        statusCode: 200,
        message: 'Successfully retrieved active users',
        data: await this.adminService.getActiveUsers(),
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error retrieving active users');
    }
  }

  @Get('new-users')
  async getNewUsers() {
    try {
      this.logger.log(`Getting new users`);
      return {
        statusCode: 200,
        message: 'Successfully retrieved new users',
        data: await this.adminService.getNewUsers(),
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error retrieving new users');
    }
  }

  @Get('confusion-matrix')
  async getConfusionMatrix(@Query() query: modelQueryDTO) {
    try {
      this.logger.log(`Getting confusion matrix`);

      if (query.model) {
        return {
          statusCode: 200,
          message: 'Successfully retrieved confusion matrix',
          data: await this.adminService.getConfusionMatrix(query.model),
        };
      } else {
        return {
          statusCode: 200,
          message: 'Successfully retrieved confusion matrix',
          data: await this.adminService.getConfusionMatrix(),
        };
      }
    } catch (error) {
      this.logger.error(`Error getting confusion matrix`, error);
      throw new BadRequestException('Error getting confusion matrix');
    }
  }

  @Get('confidence-hit-rate')
  async getConfidenceHitRate() {
    try {
      this.logger.log(`Getting confidence hit rate`);

      return {
        statusCode: 200,
        message: 'Successfully retrieved confidence hit rate',
        data: await this.adminService.getConfidenceHitRate(),
      };
    } catch (error) {
      this.logger.error(`Error getting confidence hit rate`, error);
      throw new BadRequestException('Error getting confidence hit rate');
    }
  }
}

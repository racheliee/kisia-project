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
import { TotalRequestsQueryDTO } from './dto/totalrequest.dto';
import { UrlDto } from 'src/url/dto/url.dto';

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
  async getTotalRequests(@Query() query: TotalRequestsQueryDTO) {
    try {
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

  @Get('top-urls')
  async getTop5AccessedUrls() {
    try {
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
}

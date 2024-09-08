import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlDto } from './dto/url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  private readonly logger = new Logger(UrlController.name);

  @Post('database')
  async processUrl(@Body() urlDto: UrlDto) {
    try {
      this.logger.log(`Processing url: ${urlDto.url}`);

      return {
        statusCode: 200,
        message: 'Successfully received and processed Url',
        data: await this.urlService.processUrl(urlDto.url),
      };
    } catch (error) {
      this.logger.error(`Error processing url: ${urlDto.url}`, error);
      throw new BadRequestException('Error processing url');
    }
  }
}

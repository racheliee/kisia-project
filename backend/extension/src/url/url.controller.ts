import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlDto } from './dto/url.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('url')
@UseGuards(JwtAuthGuard)
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  private readonly logger = new Logger(UrlController.name);

  @Post('database')
  async processUrl(@Body() urlDto: UrlDto, @Req() req: any) {
    try {
      this.logger.log(`Processing url: ${urlDto.url}`);

      const { id } = req.user;

      return {
        statusCode: 200,
        message: 'Successfully received and processed Url',
        data: await this.urlService.processUrl(urlDto.url, id),
      };
    } catch (error) {
      this.logger.error(`Error processing url: ${urlDto.url}`, error);
      throw new BadRequestException('Error processing url');
    }
  }
}

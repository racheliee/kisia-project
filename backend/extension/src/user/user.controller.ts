import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
} from '@nestjs/common';
import { FeebackDTO } from './dto/feedback.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get('history')
  async getHistory() {}

  @Post('feedback')
  async postFeedback(@Body() feedbackDTO: FeebackDTO) {
    try {
      await this.userService.postFeedback(feedbackDTO);

      this.logger.log(`Feedback posted successfully`);
      return {
        statusCode: 201,
        message: 'Feedback posted successfully',
      };
    } catch (error) {
      this.logger.error(`Error posting feedback`, error);
      throw new BadRequestException(`Error posting feedback: ${error.message}`);
    }
  }
}

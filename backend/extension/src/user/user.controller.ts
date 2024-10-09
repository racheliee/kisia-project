import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FeebackDTO } from './dto/feedback.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  // get user history
  @Get('history')
  async getHistory(@Req() req: any) {
    try {
        const { id } = req.user;

        this.logger.log(`Getting user history`);

        return {
            statusCode: 200,
            message: 'User history fetched successfully',
            data: await this.userService.getHistory(id),
        }
    } catch (error) {
        this.logger.error(`Error getting user history`, error);
        throw new BadRequestException(`Error getting user history: ${error.message}`);
    }
  }

  // post feedback
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

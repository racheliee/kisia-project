import { BadRequestException, Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signUpDTO: SignUpDTO) {
    try {
        const user = await this.authService.signup(signUpDTO);
        return {
            statusCode: 201,
            message: 'User created successfully',
            data: user
        }
    } catch (error) {
        this.logger.error(`Error creating user`, error);
        throw new BadRequestException(`Error creating user: ${error.message}`);
    }
  }

  @Post('login')
  async login() {}

  @Post('logout')
  async logout() {}

  @Post('refresh')
  async refresh() {}
}

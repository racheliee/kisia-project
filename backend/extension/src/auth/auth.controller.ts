import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';

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
        data: user,
      };
    } catch (error) {
      this.logger.error(`Error creating user`, error);
      throw new BadRequestException(`Error creating user: ${error.message}`);
    }
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    try {
      const user = await this.authService.validateUser(loginDTO);

      return {
        statusCode: 200,
        message: 'User logged in successfully',
        data: await this.authService.login(user),
      };
    } catch (error) {
      this.logger.error(`Error logging in user`, error);
      throw new BadRequestException(`Error logging in user: ${error.message}`);
    }
  }

  @Post('logout')
  async logout() {}

  @Post('refresh')
  async refresh() {}
}

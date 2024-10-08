import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';
import { Response } from 'express';

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
  async login(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = await this.authService.validateUser(loginDTO);
      const { access_token, refresh_token } = await this.authService.login(user);

      // set cookies
      res.setHeader('Authorization', `Bearer ${access_token} ${refresh_token}`);
      res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      return {
        statusCode: 200,
        message: 'User logged in successfully',
        data: { access_token: access_token, refresh_token: refresh_token },
      };
    } catch (error) {
      this.logger.error(`Error logging in user`, error);
      throw new BadRequestException(`Error logging in user: ${error.message}`);
    }
  }

  @Post('refresh')
  async refresh(@Req() req: any, @Res({ passthrough: true }) res: Response) {}

  @Post('logout')
  async logout() {}
}

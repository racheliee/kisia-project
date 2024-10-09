import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signUpDTO: SignUpDTO) {
    try {
      const user = await this.authService.signup(signUpDTO);

      this.logger.log(`User created successfully`);

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
      const { access_token, refresh_token } =
        await this.authService.login(user);

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

      this.logger.log(`User logged in successfully`);

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
  async refresh(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    try {
      const refreshToken = req.cookies['refresh_token'];

      if (!refreshToken) {
        throw new BadRequestException('No refresh token provided');
      }

      // validate & refresh token
      const { accessToken, newRefreshToken } =
        await this.authService.refresh(refreshToken);

      // set cookies
      res.setHeader(
        'Authorization',
        `Bearer ${accessToken} ${newRefreshToken}`,
      );
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      res.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      this.logger.log(`Token refreshed successfully`);

      return {
        statusCode: 200,
        message: 'Token refreshed successfully',
        data: { access_token: accessToken, refresh_token: newRefreshToken },
      };
    } catch (error) {
      this.logger.error(`Error refreshing token`, error);
      throw new BadRequestException(`Error refreshing token: ${error.message}`);
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    try {
      const refreshToken = req.cookies['refresh_token'];

      if (!refreshToken) {
        throw new BadRequestException('No refresh token provided');
      }

      await this.authService.logout(refreshToken);

      // clear cookies
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      this.logger.log(`User logged out successfully`);

      return {
        statusCode: 200,
        message: 'User logged out successfully',
      };
    } catch (error) {
      this.logger.error(`Error logging out user`, error);
      throw new BadRequestException(`Error logging out user: ${error.message}`);
    }
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDTO } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { last } from 'rxjs';
import { User } from '@prisma/client';
import { Payload } from '@prisma/client/runtime/library';

export interface JwtPayload {
  id: string;
  username: string;
  type: string;
  lastLogin: Date;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signUpDTO: SignUpDTO) {
    // check if user exists
    const emailExists = await this.userService.findOneByEmail(signUpDTO.email);
    if (emailExists) {
      throw new BadRequestException('User with this email already exists');
    }

    const usernameExists = await this.userService.findOneByUsername(
      signUpDTO.username,
    );
    if (usernameExists) {
      throw new BadRequestException('User with this username already exists');
    }

    // hash password
    const saltOrRounds = parseInt(
      this.configService.get<string>('PASSWORD_SALT_OR_ROUNDS'),
    );
    const hashedPassword = await bcrypt.hash(signUpDTO.password, saltOrRounds);

    // create user
    const user = await this.prismaService.user.create({
      data: {
        username: signUpDTO.username,
        email: signUpDTO.email,
        password: hashedPassword,
      },
    });

    return;
  }

  // check if user credentials are valid
  async validateUser(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userService.findOneByUsername(loginDTO.username);
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    // check password
    if (!(await bcrypt.compare(loginDTO.password, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  // login user
  async login(user: User) {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      type: user.type,
      lastLogin: user.lastLogin,
    };

    // generate access and refresh tokens
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
    });

    // hash &refresh token
    const saltOrRounds = parseInt(
      this.configService.get<string>('PASSWORD_SALT_OR_ROUNDS'),
    );

    if (isNaN(saltOrRounds)) {
      throw new Error('Invalid salt rounds configuration');
    }

    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);
    await this.userService.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    // update last login
    await this.userService.update(user.id, { lastLogin: new Date() });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}

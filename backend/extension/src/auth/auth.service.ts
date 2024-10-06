import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDTO } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

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
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignupCredentialsDto } from './dtos/auth-signup-credentials.dto';
import { AuthSigninCredentialsDto } from './dtos/auth-signin-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signup(authCredentialsDto: AuthSignupCredentialsDto): Promise<void> {
    return await this.usersRepository.createUser(authCredentialsDto);
  }

  async signin(
    authSigninCredentialsDto: AuthSigninCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authSigninCredentialsDto;
    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username: user.username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check login credentials');
    }
  }
}

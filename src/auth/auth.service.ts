import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignupCredentialsDto } from './dtos/auth-signup-credentials.dto';
import { AuthSigninCredentialsDto } from './dtos/auth-signin-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(
    authSignupCredentialsDto: AuthSignupCredentialsDto,
  ): Promise<void> {
    const { username, email, password } = authSignupCredentialsDto;

    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      // Improve this messaging when move to postresql
      // if (error.code === '23505') {
      //   throw new ConflictExeption('Username already in use');
      // } else {
      //   throw new InternalServerErrorException();
      // }
      throw new ConflictException('Username or Email already in use');
    }
  }

  async signin(
    authSigninCredentialsDto: AuthSigninCredentialsDto,
  ): Promise<{ accessToken: string; username: string }> {
    const { email, password } = authSigninCredentialsDto;
    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const username: string = user.username;
      const payload: JwtPayload = { username: user.username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken, username };
    } else {
      throw new UnauthorizedException('Please check login credentials');
    }
  }
}

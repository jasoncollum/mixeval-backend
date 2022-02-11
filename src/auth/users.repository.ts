import {
  ConflictException,
  // InternalServerErrorException,
  // NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthSignupCredentialsDto } from './dtos/auth-signup-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(
    authSignupCredentialsDto: AuthSignupCredentialsDto,
  ): Promise<void> {
    const { username, email, password } = authSignupCredentialsDto;

    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      email,
      password: hashedPassword,
    });

    try {
      await this.save(user);
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
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignupCredentialsDto } from './dtos/auth-signup-credentials.dto';
import { AuthSigninCredentialsDto } from './dtos/auth-signin-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signup(
    @Body() authSignupCredentials: AuthSignupCredentialsDto,
  ): Promise<void> {
    return await this.authService.signup(authSignupCredentials);
  }

  @Post('/signin')
  async signin(
    @Body() authSigninCredentialsDto: AuthSigninCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signin(authSigninCredentialsDto);
  }
}

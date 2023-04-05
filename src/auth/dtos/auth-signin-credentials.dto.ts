import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class AuthSigninCredentialsDto {
  @IsEmail()
  email: string;

  // Must contain 1 uppercase letter, 1 lowercase letter, 1 number or special character
  // There is no length validation in this regex
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}

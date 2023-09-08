import { IsNotEmpty } from 'class-validator';

export class LoginBodyDto {
  @IsNotEmpty()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;
}

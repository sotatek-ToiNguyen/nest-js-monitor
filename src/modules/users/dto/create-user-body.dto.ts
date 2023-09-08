import { IsNotEmpty, IsString, Min, Max } from 'class-validator';
export class CreateUserBodyDto {
  @IsString()
  @IsNotEmpty()
  public readonly walletAddress: string;

  @IsString()
  @IsNotEmpty()
  public readonly email: string;


  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}

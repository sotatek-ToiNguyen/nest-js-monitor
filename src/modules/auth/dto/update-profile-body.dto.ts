import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfileBodyDto {
  @IsString()
  @IsNotEmpty()
  public readonly privateKey: string;
}
